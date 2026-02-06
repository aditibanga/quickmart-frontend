import Link from "next/link";

export default function ProductCard({ id, name, price, imageUrl }) {
  return (
    <Link href={`/product/${id}`}>
      <div className="min-w-[180px] cursor-pointer rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
        
        {/* Product Image */}
        <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150?text=No+Image";
              }}
            />
          ) : (
            <div className="text-3xl">🧺</div>
          )}
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium text-gray-800 line-clamp-2">
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

