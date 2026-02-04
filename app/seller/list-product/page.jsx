"use client";

import { useState } from "react";
import { createProduct } from "../../../services/productService";

const CATEGORIES = [
  { id: 1, name: "Fruits" },
  { id: 2, name: "Vegetables" },
  { id: 3, name: "Dairy" },
  { id: 4, name: "Snacks" },
  { id: 5, name: "Drinks" },
  { id: 6, name: "Bakery" },
  { id: 7, name: "Meat" },
  { id: 8, name: "Seafood" },
  { id: 9, name: "Frozen Foods" },
  { id: 10, name: "Sweets" },
  { id: 11, name: "Grains & Pulses" },
  { id: 12, name: "Spices & Masala" },
  { id: 13, name: "Oil & Ghee" },
  { id: 14, name: "Cereals & Breakfast" },
  { id: 15, name: "Noodles & Pasta" },
  { id: 16, name: "Sauces & Condiments" },
  { id: 17, name: "Dry Fruits & Nuts" },
  { id: 18, name: "Tea & Coffee" },
  { id: 19, name: "Pickles & Chutneys" },
  { id: 20, name: "Ready to Eat" },
  { id: 21, name: "Personal Care" },
  { id: 22, name: "Household" },
  { id: 23, name: "Baby Care" },
  { id: 24, name: "Health & Nutrition" },
  { id: 25, name: "Pet Food" },
  { id: 26, name: "Organic Products" },
  { id: 27, name: "Canned Foods" },
  { id: 28, name: "Eggs" },
  { id: 29, name: "Juice & Energy Drinks" },
  { id: 30, name: "Stationery" },
];

export default function ListProductPage() {
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    price: "",
    quantity: "",
    unit: "kg",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryId = Number(formData.categoryId);

      if (!categoryId) {
        alert("Please select a category");
        return;
      }

      await createProduct(categoryId, {
        name: formData.name.trim(),
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        unit: formData.unit,
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim(),
      });

      alert("✅ Product listed successfully!");

      setFormData({
        categoryId: "",
        name: "",
        price: "",
        quantity: "",
        unit: "kg",
        description: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Create product failed:", error);
      alert("❌ Failed to list product. Check console.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-center text-2xl font-semibold text-blue-600">
        List New Product
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Category */}
          <div>
            <label className="block text-sm text-gray-600">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm text-gray-600">Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
          </div>

          {/* Quantity + Unit */}
          <div className="flex gap-3">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-1/2 rounded-lg border px-4 py-2"
              required
            />
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-1/2 rounded-lg border px-4 py-2"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="l">l</option>
              <option value="ml">ml</option>
              <option value="pcs">pcs</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              List Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
