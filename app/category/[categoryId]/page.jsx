"use client";

import { useEffect, useRef, useState } from "react";
import { getProductsByCategory } from "../../../services/productService";
import ProductCard from "../../../components/products/ProductCard";

export default function CategoryProductsPage({ params }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef(null);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const resolvedParams = await params;
      const categoryId = resolvedParams.categoryId;

      const data = await getProductsByCategory(categoryId, page, 10);

      setProducts((prev) => [...prev, ...data.content]);
      setPage((prev) => prev + 1);

      if (page + 1 >= data.totalPages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load category products", err);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // horizontal scroll pagination
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 100) {
      fetchProducts();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-xl font-semibold text-gray-800">
        Products
      </h1>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}

        {loading && (
          <div className="flex min-w-[180px] items-center justify-center text-sm text-gray-400">
            Loading...
          </div>
        )}
      </div>

      {!loading && products.length === 0 && (
        <p className="mt-4 text-gray-500">No products found.</p>
      )}
    </div>
  );
}
