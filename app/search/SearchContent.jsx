"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "../../services/productService";
import ProductCard from "../../components/products/ProductCard";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef(null);

  const fetchResults = async () => {
    if (!keyword || loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await searchProducts(keyword, page, 10);

      setProducts((prev) => [...prev, ...data.items]);
      setPage((prev) => prev + 1);

      if (page + 1 >= data.totalPages) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [keyword]);

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line
  }, [keyword]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 100) {
      fetchResults();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-xl font-semibold text-gray-800">
        Search results for{" "}
        <span className="text-blue-600">"{keyword}"</span>
      </h1>

      {products.length === 0 && !loading && (
        <p className="text-gray-500">No products found.</p>
      )}

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
    </div>
  );
}
