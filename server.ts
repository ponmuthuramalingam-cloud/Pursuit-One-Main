import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const distPath = path.join(__dirname, "dist");
  const indexPath = path.join(distPath, "index.html");
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(distPath);

  console.log(`--- Starting Server ---`);
  console.log(`Environment: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`Mode: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log(`Port: ${PORT}`);
  console.log(`Directory: ${__dirname}`);

  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV,
      time: new Date().toISOString()
    });
  });

  // API Routes
  app.post("/api/contact", (req, res) => {
    const { name, email, company, message } = req.body;
    console.log(`New Lead: ${name} (${email}) from ${company}`);
    res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
  });

  // Vite middleware for development
  if (!isProduction) {
    console.log("Starting in DEVELOPMENT mode (Vite middleware)");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode (Serving dist folder)");
    
    if (!fs.existsSync(distPath)) {
      console.error("CRITICAL ERROR: 'dist' folder not found! Ensure 'npm run build' was executed.");
    } else {
      console.log(`Serving static files from: ${distPath}`);
      if (fs.existsSync(indexPath)) {
        console.log("Found index.html in dist folder.");
      } else {
        console.error("ERROR: index.html not found in dist folder!");
      }
    }
    
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
