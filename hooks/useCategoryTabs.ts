"use client";

import { CATEGORY_KEY, setCategoryTabsStorage } from "@/contexts/cart.storage";
import { UseCategoryTabsProps } from "@/utils/types";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
export const useCategoryTabs = ({
  selectedCategory,
  searchParams,
  menuId,
}: UseCategoryTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!selectedCategory) {
      try {
        localStorage.removeItem(CATEGORY_KEY);
      } catch (error) {
        console.error("Error clearing category from localStorage:", error);
      }
      return;
    }

    setCategoryTabsStorage(selectedCategory.id.toString());

    if (!selectedCategory?.slug) return;

    const currentCategory = searchParams.get("category");

    if (currentCategory !== selectedCategory.slug) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("category", selectedCategory.slug);
      params.delete("item");
      router.replace(pathname + "?" + params.toString(), { scroll: false });
    }

    if (menuId) {
      setTimeout(() => {
        const targetElement = document.getElementById(menuId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [selectedCategory, searchParams, menuId, router, pathname]);
};
