import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
