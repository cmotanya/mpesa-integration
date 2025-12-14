"use client";

import fetchMenu from "@/components/FetchMenu";
import { slugify } from "@/utils/helper";
import { Category, UseMenuProps } from "@/utils/types";
import { useEffect } from "react";

export const useMenu = ({
  searchParams,
  setCategories,
  setSelectedCategory,
  setSelectedItem,
  menuId,
}: UseMenuProps) => {
  useEffect(() => {
    const loadMenu = async () => {
      const data = await fetchMenu();

      if (!data || data.length === 0) {
        return;
      }

      const dataWithSlug = data.map((category) => ({
        ...category,
        slug: slugify(category.name),
      })) as Category[];

      setCategories(dataWithSlug);

      const selectedCategorySlug = searchParams.get("category");

      const itemId = searchParams.get("item");

      const initialCategory =
        (selectedCategorySlug &&
          dataWithSlug.find((c) => c.slug === selectedCategorySlug)) ||
        dataWithSlug[0];

      setSelectedCategory(initialCategory || null);

      if (itemId && setSelectedItem && initialCategory?.items) {
        const item = initialCategory.items.find((i) => i.id === itemId);
        setSelectedItem(item?.id || null);
      }

      if (menuId) {
        const targetElement = document.getElementById(menuId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    loadMenu();

    //   eslint-disable-next-line
  }, []);
};
