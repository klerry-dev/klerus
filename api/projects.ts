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
          .from("projects")
          .select("*")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: true });

        if (error) throw error;

        res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
      }
      break;

    case "POST":
      try {
        const projectData = req.body;

        const { data, error } = await supabase
          .from("projects")
          .insert([
            {
              ...projectData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        res.status(201).json(data);
      } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
      }
      break;

    case "PUT":
      try {
        const { id, ...updateData } = req.body;

        const { data, error } = await supabase
          .from("projects")
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
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Failed to update project" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;

        const { error } = await supabase.from("projects").delete().eq("id", id);

        if (error) throw error;

        res.status(204).end();
      } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Failed to delete project" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
