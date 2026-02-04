"use client";

import { useEffect, useState } from "react";
import { getProductById } from "../../../services/productService";
import { useCart } from "../../../context/CartContext";

export default function ProductDetailPage({ params }) {
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center rounded-2xl bg-gray-100 p-10">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-80 object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h1>

          <p className="mt-3 text-xl font-bold text-blue-600">
            ₹{product.price}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {product.quantity} {product.unit}
          </p>

          <p className="mt-6 text-gray-700">
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
