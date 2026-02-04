"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/productService";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef(null);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await getProducts(page, 10);

      setProducts((prev) => [...prev, ...data.items]);
      setPage((prev) => prev + 1);

      if (page + 1 >= data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchProducts();
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
    <section className="mx-auto mt-10 max-w-7xl px-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Popular products
      </h2>

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
    </section>
  );
}
