import Link from "next/link";

export default function CategoryCard({ id, name, imageUrl }) {
  return (
    <Link href={`/category/${id}`}>
      <div
        className="
          flex h-44 w-40 cursor-pointer flex-col
          rounded-2xl bg-white p-4
          shadow-sm transition hover:shadow-md
        "
      >
        {/* Image container */}
        <div className="mb-3 flex h-24 w-full items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full rounded-xl object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Category name */}
        <p
          className="
            text-center text-sm font-semibold text-gray-800
            leading-snug line-clamp-2
          "
        >
          {name}
        </p>
      </div>
    </Link>
  );
}
