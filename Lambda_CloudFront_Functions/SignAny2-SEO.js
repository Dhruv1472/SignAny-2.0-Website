function handler(event) {
  var request = event.request;
  var path = request.uri || "/";
  var headers = request.headers || {};
  var uaHeader = headers["user-agent"] || headers["User-Agent"];
  var ua = uaHeader && uaHeader.value ? uaHeader.value.toLowerCase() : "";

  // Normalize trailing slash (except for root "/")
  if (path.length > 1 && path.charAt(path.length - 1) === "/") {
    path = path.substring(0, path.length - 1);
  }

  // Never prerender static files — serve them directly from S3
  var staticFile = /\.(xml|txt|json|ico|png|svg|jpg|jpeg|gif|webp|css|js|woff|woff2)$/i;
  if (staticFile.test(path)) return request;

  var map = {
    "/": "/index.html",
    "/index": "/index.html",
    "/index.html": "/index.html",
    "/faqs": "/prerender/faqs.html",
    "/faqs/index.html": "/prerender/faqs.html",
    "/user-guide": "/prerender/userguide.html",
    "/user-guide/index.html": "/prerender/userguide.html",
    "/userguide": "/prerender/userguide.html",
    "/blog": "/prerender/blog.html",
    "/blog/index.html": "/prerender/blog.html",
    "/salesforce": "/prerender/salesforce.html",
    "/salesforce/index.html": "/prerender/salesforce.html",
    "/contact-us": "/prerender/contact-us.html",
    "/contact-us/index.html": "/prerender/contact-us.html",
    "/hash-verification": "/prerender/hash-verification.html",
    "/hash-verification/index.html": "/prerender/hash-verification.html",
    "/verifyHash": "/prerender/hash-verification.html",
    "/verifyHash/index.html": "/prerender/hash-verification.html",

    // Feature pages
    "/features/document-setup": "/prerender/features/document-setup.html",
    "/features/all-documents": "/prerender/features/all-documents.html",
    "/features/dashboard-analytics": "/prerender/features/dashboard-analytics.html",
    "/features/admin-panel": "/prerender/features/admin-panel.html",
    "/features/sign-page": "/prerender/features/sign-page.html",
    "/features/integrations-connectors": "/prerender/features/integrations-connectors.html",
    "/features/audit-report": "/prerender/features/audit-report.html"
  };

  // If the path is mapped, serve its dedicated prerendered HTML directly to everyone!
  // (Both humans and bots will see the exact metadata in "View Page Source", and the injected Vite scripts will boot the React app)
  if (map[path]) {
    request.uri = map[path];
    return request;
  }

  // For unmapped routes: bots get default.html fallback, while humans pass through to S3/SPA (index.html)
  var isBot = !ua || /(googlebot|google-inspectiontool|google-extended|googleother|storebot-google|adsbot-google|mediapartners-google|chrome-lighthouse|gptbot|chatgpt-user|oai-searchbot|claude-web|claudebot|anthropic-ai|perplexitybot|perplexity-user|bingbot|bingpreview|msnbot|applebot|facebookexternalhit|facebot|meta-externalagent|meta-externalfetcher|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|pinterest|redditbot|quora|bufferbot|embedly|duckduckbot|yandex|baiduspider|sogou|exabot|ahrefsbot|semrushbot|dotbot|rogerbot|screaming frog|ia_archiver|bytespider|cohere-ai|diffbot|robolly|opengraph|metatags|metadata|checker|validator|inspector|preview|headless|phantomjs|puppeteer|playwright|selenium|webdriver|node-fetch|axios|got\/|undici|python|urllib|curl|wget|go-http-client|okhttp|httpclient|faraday|ruby|bot|spider|crawler|scraper)/.test(ua);

  if (isBot) {
    request.uri = "/prerender/default.html";
  }

  return request;
}