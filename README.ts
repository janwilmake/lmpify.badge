/**
 * Orange Badge Generator Cloudflare Worker
 * Creates a badge with a lightbulb icon and customizable title
 * Usage: /?title=Your Text Here
 */

// CORS headers object for reuse
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: any) {
    // Handle preflight OPTIONS request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: { ...corsHeaders, "Access-Control-Max-Age": "86400" },
      });
    }

    const url = new URL(request.url);
    const title = "Prompt It";
    const headline = url.pathname.slice(1) || "LMPIFY";
    try {
      // Get the badge response

      const badgeUrl = `https://img.shields.io/badge/💡_${headline.replaceAll(
        " ",
        "_",
      )}-${title.replaceAll(" ", "_")}_➡️-orange`;

      const badgeResponse = await fetch(badgeUrl);

      if (!badgeResponse.ok) {
        throw new Error(`Failed to fetch badge: ${badgeResponse.status}`);
      }

      // Return the badge with proper headers
      return new Response(badgeResponse.body, {
        headers: {
          ...Object.fromEntries(badgeResponse.headers),
          "Cache-Control": "max-age=86400",
          ...corsHeaders,
        },
      });
    } catch (error) {
      // Return a simple error badge if something goes wrong
      return new Response("Error", { status: 500 });
    }
  },
};
