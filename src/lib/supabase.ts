import { createClient } from "@supabase/supabase-js";

// Your project: iijgdnfbvlfczmanhekg
const SUPABASE_URL = "https://iijgdnfbvlfczmanhekg.supabase.co";
// You need to get this from your Supabase dashboard > Settings > API
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpamdkbmZidmxmY3ptYW5oZWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDczMzIsImV4cCI6MjA4ODI4MzMzMn0.3YkwBHhxuWje6CQyX1RbkOjdG5VEH1UtmW6XvMj0nnY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database types
export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number;
          author: string;
          avatar: string;
          posted: string;
          image: string;
          description: string;
          since: string;
          platform: string;
          likes: number;
          shares: number;
          followers: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["posts"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["posts"]["Row"]>;
      };
      testimonials: {
        Row: {
          id: number;
          name: string;
          role: string;
          content: string;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["testimonials"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
      };
      services: {
        Row: {
          id: number;
          title: string;
          description: string;
          icon: string;
          color: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["services"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      };
      projects: {
        Row: {
          id: number;
          title: string;
          description: string;
          image: string;
          category: string;
          technologies: string[];
          github_url: string | null;
          live_url: string | null;
          featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["projects"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
      };
      shop_products: {
        Row: {
          id: number;
          name: string;
          description: string;
          price: number;
          image: string;
          category: string;
          in_stock: boolean;
          featured: boolean;
          tags: string[];
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["shop_products"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["shop_products"]["Row"]>;
      };
    };
  };
};
