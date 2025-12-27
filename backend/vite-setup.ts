// backend/vite-setup.ts
import { type Express } from "express";
import { createServer } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupVite(server: Server, app: Express) {
  const viteDevServer = await createServer({
    ...viteConfig,
    configFile: false,
    server: { 
      middlewareMode: true, 
      hmr: { server } 
    },
    appType: "custom",
  });

  app.use(viteDevServer.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Don't handle API routes
      if (url.startsWith('/api')) {
        return next();
      }

      const clientTemplate = path.resolve(__dirname, "..", "client", "index.html");
      
      if (!fs.existsSync(clientTemplate)) {
        throw new Error(`Template not found: ${clientTemplate}`);
      }

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      
      const page = await viteDevServer.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      viteDevServer.ssrFixStacktrace(e as Error);
      console.error("Vite error:", e);
      next(e);
    }
  });
}