"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartItems } = useCart();

  const [search, setSearch] = useState("");

  const isSellerPage = pathname.startsWith("/seller");

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-semibold text-blue-600">
            QuickMart
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            
            {/* Cart (buyer only) */}
            {!isSellerPage && (
              <Link href="/cart" className="relative text-xl">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 rounded-full bg-blue-600 px-2 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Switch account */}
            <Link href={isSellerPage ? "/" : "/seller/list-product"}>
              <button className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
                {isSellerPage ? "Switch to Buyer" : "Switch Account"}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search bar — homepage only */}
      {!isSellerPage && pathname === "/" && (
        <div className="border-t border-gray-100">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search for fruits, snacks, essentials..."
              className="w-full rounded-full border border-gray-200 px-4 py-3 text-sm outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
}
