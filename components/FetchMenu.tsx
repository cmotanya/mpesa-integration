import { supabase } from "@/lib/supabase";
import { Category } from "@/utils/types";

const fetchMenu = async (): Promise<Category[]> => {
  try {
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
        image_url,
        is_available
        )
        `,
      )
      .eq("menu_items.is_available", true)
      .order("display_order");

    if (error) throw error;

    const filteredData =
      data?.map((category) => ({
        ...category,
        menu_items: category.menu_items?.filter(
          (item) => item.is_available || [],
        ),
      })) || [];

    return filteredData;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};

export default fetchMenu;
