import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import * as prismic from "@prismicio/client";

const s3 = new S3Client({ region: "us-east-1" });
const cf = new CloudFrontClient({ region: "us-east-1" });

const BUCKET_NAME = "SIGNANY_WEB";
const CLOUDFRONT_ID = "E1AXP1T67H080B";
const SITE_URL = "https://esignany.com";
const PRISMIC_REPO = "signany20";

// Complete static pages aligned with existing sitemap.xml and routes
const STATIC_PAGES = [
  { url: "/", priority: "1.0", changefreq: "monthly" },
  { url: "/salesforce", priority: "0.9", changefreq: "monthly" },
  { url: "/blog", priority: "0.8", changefreq: "weekly" },
  { url: "/faqs", priority: "0.8", changefreq: "monthly" },
  { url: "/contact-us", priority: "0.7", changefreq: "monthly" },
  { url: "/lifecycle", priority: "0.7", changefreq: "monthly" },
  { url: "/user-guide", priority: "0.7", changefreq: "monthly" },
  { url: "/verifyHash", priority: "0.6", changefreq: "monthly" },
  { url: "/features/document-setup", priority: "0.9", changefreq: "monthly" },
  { url: "/features/all-documents", priority: "0.9", changefreq: "monthly" },
  { url: "/features/dashboard-analytics", priority: "0.9", changefreq: "monthly" },
  { url: "/features/admin-panel", priority: "0.9", changefreq: "monthly" },
  { url: "/features/sign-page", priority: "0.9", changefreq: "monthly" },
  { url: "/features/integrations-connectors", priority: "0.9", changefreq: "monthly" },
  { url: "/features/audit-report", priority: "0.9", changefreq: "monthly" },
  { url: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
  { url: "/terms-and-conditions", priority: "0.5", changefreq: "yearly" },
];

export async function handler(event) {
  try {
    // 1. Extract updated document IDs from Prismic webhook payload
    let updatedDocIds = [];
    if (event?.body) {
      try {
        let rawBody = event.body;
        if (event.isBase64Encoded) {
          rawBody = Buffer.from(rawBody, "base64").toString("utf-8");
        }
        const payload = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;
        if (payload && Array.isArray(payload.documents)) {
          updatedDocIds = payload.documents;
        }
      } catch (e) {
        console.warn("Failed to parse webhook body:", e.message);
      }
    }

    //Fetch existing sitemap to preserve old lastmod values
    const existingLastmods = {};
    try {
      const getObjCmd = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "SA-Web/sitemap.xml",
      });
      const response = await s3.send(getObjCmd);
      const existingSitemap = await response.Body.transformToString();

      const urlRegex = /<url>([\s\S]*?)<\/url>/g;
      let match;
      while ((match = urlRegex.exec(existingSitemap)) !== null) {
        const content = match[1];
        const locMatch = content.match(/<loc>(.*?)<\/loc>/);
        const lastmodMatch = content.match(/<lastmod>(.*?)<\/lastmod>/);
        if (locMatch) {
          const rawUrl = locMatch[1].trim();
          const urlPath = rawUrl.replace(SITE_URL, "") || "/";
          if (lastmodMatch) {
            existingLastmods[urlPath] = lastmodMatch[1].trim();
          }
        }
      }
    } catch (e) {
      console.log("No existing sitemap found or error reading it:", e.message);
    }

    const today = new Date().toISOString().split("T")[0];

    // 3. Fetch all published blog posts from Prismic
    const client = prismic.createClient(PRISMIC_REPO);
    const posts = await client.getAllByType("signany_blogs");

    const blogEntries = posts
      .filter((post) => Boolean(post?.uid))
      .map((post) => {
        const url = `/blog/${post.uid}`;
        const prismicLastmod = post.last_publication_date?.split("T")[0];
        const existingLastmod = existingLastmods[url];

        let lastmod = prismicLastmod || existingLastmod || today;
        if (updatedDocIds.includes(post.id)) {
          lastmod = today;
        } else if (existingLastmod && prismicLastmod) {
          lastmod = prismicLastmod;
        }

        return {
          url,
          lastmod,
          priority: "0.7",
          changefreq: "monthly",
        };
      });

    const staticEntries = STATIC_PAGES.map((page) => ({
      ...page,
      lastmod: existingLastmods[page.url] || today,
    }));

    const allEntries = [...staticEntries, ...blogEntries];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${allEntries
        .map(
          (entry) => `  <url>
          <loc>${SITE_URL}${entry.url}</loc>
          ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
          <changefreq>${entry.changefreq}</changefreq>
          <priority>${entry.priority}</priority>
        </url>`
        )
        .join("\n")}
      </urlset>`;

    //Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "SA-Web/sitemap.xml",
        Body: sitemap,
        ContentType: "application/xml",
        CacheControl: "public, max-age=3600",
      })
    );

    //Invalidate CloudFront cache
    await cf.send(
      new CreateInvalidationCommand({
        DistributionId: CLOUDFRONT_ID,
        InvalidationBatch: {
          Paths: { Quantity: 2, Items: ["/sitemap.xml", "/blog*"] },
          CallerReference: `sitemap-${Date.now()}`,
        },
      })
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Sitemap updated successfully" }),
    };
  } catch (error) {
    console.error("Error executing sitemap webhook Lambda:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}