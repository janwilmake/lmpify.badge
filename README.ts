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

      const logoDataUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAEoElEQVRYCaVXa2hcRRQ+Z+buZncbrORFNDZNE5XEJinRSNIYoaB/BMFSELGSGkEqRkvRJG6baO2/aA1CjIr2lwg+UCMiSKUFmx9WUKGpj2haEky1CVRaard57OPeOZ7Z7N1slr137ybz487MmXO+891zZs7cC7CBRv0Nd1B/Y90GIMDYiLEqCg2CsmKM8cx6cTZEQGivKHC9zrVdEsMNwDzU+FjspcYGJx3lsEBsY4ab9josp8V5CaBhPOwrKhqnvobGtJU9MOOjgmLv2lO7p3B9E7CNlMYDtsypz0tAXD/3NCj1IwSCX2SCUO+2rWBZIbCgmF6s27JmzQh+wmvj4J/Iuzc85Y/2gw8CtTUQjc5BecXzIOR+QFlLSAjE2wD4SdY0O30f/NffgUWjCjZNX8SjYGYSyzXOGwFthMchAcGAHypvmQBphNnRZ7C0sBOvTJXh1fkyiC50gEVf8trLYJVOgPAHvDhPYudilS2jw/V3klF8BpX1C8Qie3F45t9sHT2n/ppK8Jd8TEI0oxnpxKELU7n0MmV5U0C7wKDOlp85zov4z7UH8YPZaCZA9pi6awJ0W8l3LA/h92dbcdw9DflTcN+Ox1GIBlxe6srnXJPROmjG9mkb2Nn8RDbB7Hl+AkJ28ykYw+Hzf2UbO83xtUm9IcdAGE866dhyVwIrGxzaLWWesg0892R9S4jtKQxHM1cC/3XDZhIyJJWczUSgR0HS0dV7RB9TLcvU4aj9DUIEgTHWyLMmrnfBzZdhGapJgbCCth311VVAYPNPZJKk3mgnu0YwQj9ABZh0INKBo9OXkrpohIDIBD8s2ra5elcCeAJi1KpmAOTdbHwiCeDb1E6KpggSp7DIP8DXCYGZGOFI3Y83hdpYZ4WAwFZU6o9kDcnlOSVzTUFSh6yvGbwrHeKFpXFA3Mqv3caFZw+HeTdXxlZErIZE7KS2Oc1HFwR2KbC+Svlx7PITWI6MaodQu6NHo3CIIxiJtCGp00RwlctPhAvxSbh2qQOPnb+hdXZ1NB4EwnKhFt/W8w0363BzHx1pjdJA85rbjQZbhmig5b1MBxS+6yH1yj1xCm/flyl3GuePAFvKoV+HOc8fkfCNMXB1GkxIpfSFlGp0qL4G/MFPMRF/E1+f/NCWu/WeCCQBbiz2INK8kv5XVwGzPkeM0BHe+dMw89vgqo77yDMBzn0MTGtESLF7tbgI3mvIU30f61tZPALKHMHP+SvBY/NMIIkXXz5LKEoWDlSW2fhKpVLwXFUJ34IlEI+ds9e89On8eVGmnvJiKq2+goAGnwCFgisi+0d+bQ4AFwQw8fJ8KR6fX/KCp3UKIqANKNzUBFLcmjPIVnwOh//8Xet5ba6VMBeIkvJZIcSWXN/TShRNs80LueycZAUT4L+AC1yYMuo7Bz51GARas06OnOQFE+A/oVlIqHhOQEUXc8pdhIUTQOMp8ottNqa9ifRZRLJ0/r+x17z0tr0X3bQO9d9eB8pXlRboQTwxx7WCb87CWuER0Pi+0B4wAsdWDhH/ErCIZPQgd2/p5ULauiKgHcR7t98rDaNdSFSQSJzBNyYLKkA2yf8B8LyTlofD4lcAAAAASUVORK5CYII=`;
      const badgeUrl = `https://img.shields.io/badge/${headline.replaceAll(
        " ",
        "_",
      )}-${title.replaceAll(" ", "_")}_➡️-orange?logo=${logoDataUrl}`;

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
