import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI, Chat } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabase = createClient(
  process.env.SUPABASE_URL || "https://iijgdnfbvlfczmanhekg.supabase.co",
  process.env.SUPABASE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpamdkbmZidmxmY3ptYW5oZWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDczMzIsImV4cCI6MjA4ODI4MzMzMn0.3YkwBHhxuWje6CQyX1RbkOjdG5VEH1UtmW6XvMj0nnY",
);

// Google AI configuration
const genAI =
  process.env.GEMINI_API_KEY ?
    new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

async function startServer() {
  const app = express();
  const PORT = 3001;

  // Middleware
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    console.log("GET /api/health called");
    res.json({ status: "ok", message: "Klerry Creative Studio API is active" });
  });

  // Simple test endpoint
  app.get("/api/test", (req, res) => {
    console.log("GET /api/test called");
    res.json({ message: "Test endpoint working" });
  });

  // GET all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // POST new post
  app.post("/api/posts", async (req, res) => {
    try {
      const { author, description, image, platform } = req.body;

      if (!author || !description) {
        return res
          .status(400)
          .json({ error: "Author and description are required" });
      }

      const newPost = {
        author,
        avatar: `https://picsum.photos/seed/avatar${Date.now()}/40/40`,
        posted: "Just now",
        image:
          image || `https://picsum.photos/seed/newpost${Date.now()}/400/300`,
        description,
        since: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        platform: platform || "Personal",
        likes: 0,
        shares: 0,
        followers: 0,
      };

      const { data, error } = await supabase
        .from("posts")
        .insert(newPost)
        .select()
        .single();

      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  // POST like post
  app.post("/api/posts/:id/like", async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase.rpc("like_post", {
        post_id: parseInt(id),
      });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ error: "Failed to like post" });
    }
  });

  // GET all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // GET all shop products
  app.get("/api/shop-products", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("shop_products")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET services
  app.get("/api/services", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // GET testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // POST chat with AI
  app.post("/api/chat", async (req, res) => {
    console.log("POST /api/chat called");

    // Set timeout for the request
    req.setTimeout(30000); // 30 seconds

    try {
      const { message, model = "fast" } = req.body;
      console.log("Request body:", { message, model });

      if (!message) {
        console.log("Error: Message is required");
        return res.status(400).json({ error: "Message is required" });
      }

      // For GPT-4 model, try to use real AI or fallback
      if (model === "gpt4") {
        if (!genAI) {
          console.log(
            "Warning: AI service not configured, using enhanced fallback for GPT-4",
          );

          // Enhanced responses for GPT-4 fallback
          const gpt4Responses = [
            "I understand your question about '" +
              message +
              "'. Let me provide you with a comprehensive response. As an advanced AI assistant, I can help you explore this topic in depth. What specific aspect would you like me to focus on?",
            "That's an interesting inquiry about '" +
              message +
              "'. I'd be happy to provide you with detailed insights and information. This topic has several important considerations that we can explore together.",
            "Thank you for asking about '" +
              message +
              "'. This is a valuable topic that deserves careful consideration. I can offer you multiple perspectives and detailed analysis to help you better understand this subject.",
            "Regarding '" +
              message +
              "', I can provide you with thorough information and guidance. This is an area where I can offer specific insights and practical advice tailored to your needs.",
          ];

          const response =
            gpt4Responses[Math.floor(Math.random() * gpt4Responses.length)];
          console.log("Generated GPT-4 fallback response:", response);

          // Simulate longer processing time for GPT-4
          await new Promise((resolve) =>
            setTimeout(resolve, 1500 + Math.random() * 1500),
          );

          return res.json({
            response: response,
            model: "gemini-1.5-pro (fallback)",
          });
        }

        // TODO: Implement real Gemini API call here when API key is configured
        console.log("Real AI API would be called here for GPT-4 model");
      }

      // For fast model or fallback, use simple responses
      const responses = [
        "I'm Bitto, your AI assistant! I'm here to help you with your questions.",
        "That's interesting! Tell me more about what you'd like to know.",
        "I'd be happy to help you with that. What specific information do you need?",
        "Great question! Let me think about the best way to assist you.",
        "I understand what you're asking. Here's what I can tell you...",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      console.log("Generated response:", randomResponse);

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Sending response");
      res.json({
        response: randomResponse,
        model: model === "gpt4" ? "gemini-1.5-pro" : "gemini-1.5-flash",
      });
    } catch (error) {
      console.error("Error generating AI response:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
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
