import { supabase } from "@/lib/supabase";
import { DbCategory } from "@/utils/types";

const fetchMenu = async (): Promise<DbCategory[]> => {
  try {
    console.log("Fetching menu...");

    const { data, error } = await supabase
      .from("categories")
      .select(
        `
        id,
        name,
        display_order,
        menu_items (
          id,
          name,
          description,
          price,
          display_order,
          is_available
        )
        `,
      )
      .order("display_order");

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Filter and process
    return data
      .map((category) => ({
        ...category,
        menu_items: (category.menu_items ?? [])
          .filter((item) => item.is_available)
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)),
      }))

      .filter((category) => category.menu_items.length > 0);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};

export default fetchMenu;
