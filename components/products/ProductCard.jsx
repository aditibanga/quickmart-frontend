import Link from "next/link";

export default function ProductCard({ id, name, price }) {
  return (
    <Link href={`/product/${id}`}>
      <div className="min-w-[180px] cursor-pointer rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
        {/* Image placeholder */}
        <div className="flex h-28 items-center justify-center rounded-lg bg-gray-100 text-3xl">
          🧺
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium text-gray-800">
            {name}
          </p>

          <p className="mt-3 text-sm font-semibold text-gray-900">
            ₹{price}
          </p>
        </div>
      </div>
    </Link>
  );
}
