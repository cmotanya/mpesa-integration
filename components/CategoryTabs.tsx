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
              "w-auto cursor-pointer rounded-md px-3 py-1 text-left font-medium transition-colors duration-200",
              selectedCategory?.id === category.id
                ? "bg-accent/30"
                : "bg-secondary/50 hover:bg-secondary/70",
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

  return <div className="mb-4 flex flex-wrap gap-2">{content}</div>;
};

export default CategoryTabs;
