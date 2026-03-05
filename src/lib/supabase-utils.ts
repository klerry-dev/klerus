import { supabase, Database } from "../lib/supabase";

// Posts
export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createPost = async (
  post: Database["public"]["Tables"]["posts"]["Insert"],
) => {
  const { data, error } = await supabase
    .from("posts")
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const likePost = async (postId: number) => {
  const { data, error } = await supabase.rpc("like_post", { post_id: postId });

  if (error) throw error;
  return data;
};

export const sharePost = async (postId: number) => {
  const { data, error } = await supabase.rpc("share_post", { post_id: postId });

  if (error) throw error;
  return data;
};

// Services
export const fetchServices = async () => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

// Testimonials
export const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Projects
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const fetchFeaturedProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const fetchProjectsByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("category", category)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

// Shop Products
export const fetchShopProducts = async () => {
  const { data, error } = await supabase
    .from("shop_products")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const fetchFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from("shop_products")
    .select("*")
    .eq("featured", true)
    .eq("in_stock", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const fetchProductsByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from("shop_products")
    .select("*")
    .eq("category", category)
    .eq("in_stock", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const createProject = async (
  project: Database["public"]["Tables"]["projects"]["Insert"],
) => {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createShopProduct = async (
  product: Database["public"]["Tables"]["shop_products"]["Insert"],
) => {
  const { data, error } = await supabase
    .from("shop_products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
};
