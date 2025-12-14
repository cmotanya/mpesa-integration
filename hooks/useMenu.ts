"use client";

import fetchMenu from "@/components/FetchMenu";
import { slugify } from "@/utils/helper";
import { Category, UseMenuProps } from "@/utils/types";
import { useEffect } from "react";

export const useMenu = ({
  searchParams,
  setIsLoading,
  setCategories,
  setSelectedCategory,
  setSelectedItem,
  menuId,
}: UseMenuProps) => {
  useEffect(() => {
    const loadMenu = async () => {
      setIsLoading(true);

      const data = await fetchMenu();

      if (!data || data.length === 0) {
        setIsLoading(false);
        return;
      }

      const dataWithSlug: Category[] = data.map((category) => ({
        ...category,
        slug: slugify(category.name),
      }));

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

      setIsLoading(false);

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
