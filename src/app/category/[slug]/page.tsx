import CategoryProducts from "@/components/CategoryProducts";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  // API থেকে ক্যাটাগরি অনুযায়ী পণ্য আনা
  const apiUrl =
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`;

  const res = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Products API request failed: ${res.status}`
    );
  }

  const result = await res.json();

  // API response থেকে product array বের করা
  const allProducts: Product[] = Array.isArray(result)
    ? result
    : Array.isArray(result.products)
      ? result.products
      : Array.isArray(result.data)
        ? result.data
        : Array.isArray(result.data?.products)
          ? result.data.products
          : [];

  // ক্যাটাগরির নাম ও আইকন
  const categoryName =
    allProducts[0]?.categoryNameBn ?? slug;

  const categoryIcon =
    allProducts[0]?.categoryIcon ?? "🛒";

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      {/* Category heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {categoryIcon} {categoryName}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          এই ক্যাটাগরির সব পণ্যের বর্তমান বাজারদর
        </p>
      </div>

      {/* No products */}
      {allProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="font-semibold text-gray-800">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            ক্যাটাগরির slug এবং API response পরীক্ষা করুন।
          </p>
        </div>
      ) : (
        /* Product list with sorting dropdown */
        <CategoryProducts products={allProducts} />
      )}
    </main>
  );
}



