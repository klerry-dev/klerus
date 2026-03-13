import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export default async function handler(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { data, error } = await supabase
          .from("shop_products")
          .select("*")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: true });

        if (error) throw error;

        res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;

    case "POST":
      try {
        const productData = req.body;

        const { data, error } = await supabase
          .from("shop_products")
          .insert([
            {
              ...productData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        res.status(201).json(data);
      } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
      }
      break;

    case "PUT":
      try {
        const { id, ...updateData } = req.body;

        const { data, error } = await supabase
          .from("shop_products")
          .update({
            ...updateData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;

        res.status(200).json(data);
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;

        const { error } = await supabase
          .from("shop_products")
          .delete()
          .eq("id", id);

        if (error) throw error;

        res.status(204).end();
      } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
