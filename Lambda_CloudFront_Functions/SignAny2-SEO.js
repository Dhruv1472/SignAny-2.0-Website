function handler(event) {
  var request = event.request;
  var path = request.uri || "/";
  var headers = request.headers || {};
  var uaHeader = headers["user-agent"] || headers["User-Agent"];
  var ua = uaHeader ? uaHeader.value.toLowerCase() : "";
  
  // List of bot user agents
  var isBot = /(facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|pinterest|googlebot|bingbot)/.test(ua);
  
  if (!isBot) return request;

  if (path.indexOf("?") !== -1) path = path.split("?")[0];
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  
  // Never prerender static files — serve them directly from S3
  var staticFile = /\.(xml|txt|json|ico|png|svg|jpg|jpeg|gif|webp|css|js|woff|woff2)$/i;
  if (staticFile.test(path)) return request;

  var map = {
    "/": "/prerender/home.html",
    "/index": "/prerender/home.html",
    "/index.html": "/prerender/home.html",
    "/faqs": "/prerender/faqs.html",
    "/faqs/index.html": "/prerender/faqs.html",
    "/user-guide": "/prerender/userguide.html",
    "/user-guide/index.html": "/prerender/userguide.html",
    "/userguide": "/prerender/userguide.html",
    "/blog": "/prerender/blog.html",
    "/blog/index.html": "/prerender/blog.html",

    // Feature pages
    "/features/document-setup": "/prerender/features/document-setup.html",
    "/features/all-documents": "/prerender/features/all-documents.html",
    "/features/dashboard-analytics": "/prerender/features/dashboard-analytics.html",
    "/features/admin-panel": "/prerender/features/admin-panel.html",
    "/features/sign-page": "/prerender/features/sign-page.html",
    "/features/integrations-connectors": "/prerender/features/integrations-connectors.html",
    "/features/audit-report": "/prerender/features/audit-report.html"
  };

  request.uri = map[path] || "/prerender/default.html";
  request.headers["cache-control"] = { value: "public,max-age=3600" };
  return request;
}