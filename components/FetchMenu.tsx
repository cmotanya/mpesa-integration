import { supabase } from "@/lib/supabase";
import { showToast } from "@/utils/toast";
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

    console.log("Raw data:", data); // Check what data you got
    console.log("Error:", error);

    if (error) {
      console.error("Supabase error:", error);
      showToast.error("Error fetching menu");
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn("No categories found");
      showToast.error("No categories found");
      return [];
    }

    // Filter and process
    const filteredData = (data ?? [])
      .map((category) => {
        console.log(`Category: ${category.name}, Items:`, category.menu_items);
        return {
          ...category,
          menu_items: (category.menu_items ?? [])
            .filter((item) => item.is_available)
            .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)),
        };
      })
      .filter((category) => category.menu_items.length > 0);

    console.log("Filtered data:", filteredData);

    if (filteredData.length === 0) {
      showToast.error("No available menu items found");
      return [];
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching menu:", error);
    showToast.error("Failed to load menu");
    return [];
  }
};

export default fetchMenu;
