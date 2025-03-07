import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);


app.use("/*", serveStatic({ root: "./dist" }));

app.get("/api/fetch", async (c) => {
  const targetUrl = c.req.query("url");

  if (!targetUrl) {
    return c.json({ message: "URL parameter is required" }, 400);
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      return c.json(
        { message: `Failed to fetch website: ${response.statusText}` },
        response.status as any
      );
    }

    const html = await response.text();
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return c.json(
      { message: `Error fetching website: ${(error as Error).message}` },
      500
    );
  }
});

console.log(`Server running at http://localhost:3001`);

export default {
  port: 3001,
  fetch: app.fetch,
};
