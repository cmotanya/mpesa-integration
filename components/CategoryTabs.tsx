import { setCategoryTabsStorage } from "@/contexts/cart.storage";
import { cn } from "@/utils/cn";
import { CategoryTabsProps } from "@/utils/types";

const CategoryTabs = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryTabsProps) => {
  const PLACEHOLDER_COUNT = 7;

  const content =
    categories.length > 0
      ? categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category);
              setCategoryTabsStorage(category.id.toString());
            }}
            className={cn(
              "w-auto cursor-pointer rounded-md border px-3 py-1 text-left font-medium transition-all duration-200 ease-in-out",
              selectedCategory?.id === category.id
                ? "bg-accent/50 border-accent/80 scale-105"
                : "bg-secondary/50 border-secondary/80 hover:bg-accent/30 hover:border-accent/50",
            )}
          >
            {category.name}
          </button>
        ))
      : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="bg-secondary/50 flex h-9 w-40 animate-pulse flex-wrap rounded-md"
          />
        ));

  return <div className="mb-4 flex flex-wrap gap-3">{content}</div>;
};

export default CategoryTabs;
