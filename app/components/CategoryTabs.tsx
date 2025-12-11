import { cn } from "@/utils/cn";
import { CategoryTabsProps } from "@/utils/types";
import React from "react";

const CategoryTabs = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryTabsProps) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            setSelectedCategory(
              category.id === selectedCategory?.id ? null : category,
            )
          }
          className={cn(
            "w-auto cursor-pointer rounded-md px-3 py-1 text-left font-medium transition-colors duration-200",
            selectedCategory?.id === category.id
              ? "bg-accent/30"
              : "bg-secondary/50 hover:bg-secondary/70",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
