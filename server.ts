import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", (req, res) => {
    const { name, email, company, message } = req.body;
    
    console.log("--- New Contact Form Submission ---");
    console.log(`To: Ponmuthuramalingam@gmail.com`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Company: ${company}`);
    console.log(`Message: ${message}`);
    console.log("------------------------------------");

    // In a real production app, you would use a service like SendGrid, Mailgun, or Nodemailer here.
    // Example with Nodemailer (requires configuration):
    /*
    const transporter = nodemailer.createTransport({...});
    await transporter.sendMail({
      from: email,
      to: 'Ponmuthuramalingam@gmail.com',
      subject: `New Pursuit-One CRM Lead: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`
    });
    */

    res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
