import CategorySection from "../components/categories/CategorySection";
import PromoBanner from "../components/banner/PromoBanner";
import ProductSection from "../components/products/ProductSection";

export default function Home() {
  return (
    <div>
      {/* Categories */}
      <CategorySection />

      {/* Blue banner */}
      <PromoBanner />

      {/* Popular products */}
      <ProductSection />
    </div>
  );
}


