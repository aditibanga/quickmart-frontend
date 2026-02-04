"use client";

import CategoryCard from "./CategoryCard";
import mockCategories from "../../data/mockCategories.json";

export default function CategorySection() {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Shop by category
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {mockCategories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
