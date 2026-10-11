
// interface Product {
//   id: number;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn: string;
//   categoryIcon: string;
//   unit: string;
//   image: string;
//   today: number;
//   yesterday: number;
//   lastWeek: number;
//   lastMonth: number;
//   change: {
//     dir: string;
//     pct: number;
//   };
//   markets: {
//     market: string;
//     division: string;
//     min: number;
//     max: number;
//   }[];
// }

// interface CategoryPageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export default async function CategoryPage({
//   params,
// }: CategoryPageProps) {
//   const { slug } = await params;

//   // Category slug অনুযায়ী API থেকে পণ্য আনা
//   const apiUrl =
//     `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`;
//     // https://api.abcz.workers.dev/api/bazardor/products?category

//   console.log("CATEGORY SLUG:", slug);
//   console.log("API URL:", apiUrl);

//   const res = await fetch(apiUrl, {
//     cache: "no-store",
//   });

//   console.log("API STATUS:", res.status);

//   if (!res.ok) {
//     throw new Error(
//       `Products API request failed: ${res.status}`
//     );
//   }

//   const result = await res.json();

//   console.log("API RESULT:", result);

//   // API response থেকে product array বের করা
//   const allProducts: Product[] = Array.isArray(result)
//     ? result
//     : Array.isArray(result.products)
//       ? result.products
//       : Array.isArray(result.data)
//         ? result.data
//         : Array.isArray(result.data?.products)
//           ? result.data.products
//           : [];

//   console.log("TOTAL PRODUCTS:", allProducts.length);

//   const formatPrice = (price: number) =>
//     new Intl.NumberFormat("bn-BD").format(price);

//   // Category name এবং icon
//   const categoryName =
//     allProducts[0]?.categoryNameBn ?? slug;

//   const categoryIcon =
//     allProducts[0]?.categoryIcon ?? "🛒";

//   return (
//     <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
//       {/* Category heading */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           {categoryIcon} {categoryName}
//         </h1>

//         <p className="mt-2 text-sm text-gray-500">
//           এই ক্যাটাগরির সব পণ্যের বর্তমান বাজারদর
//         </p>

//         <p className="mt-1 text-sm text-gray-500">
//           মোট পণ্য: {allProducts.length}টি
//         </p>
//       </div>

//       {/* No products */}
//       {allProducts.length === 0 ? (
//         <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
//           <h2 className="font-semibold text-gray-800">
//             এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
//           </h2>

//           <p className="mt-2 text-sm text-gray-600">
//             ক্যাটাগরির slug এবং API response পরীক্ষা করুন।
//           </p>
//         </div>
//       ) : (
//         /* Product grid */
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {allProducts.map((product) => (
//             <article
//               key={product.id}
//               className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
//             >
//               {/* Product information */}
//               <div className="p-4">
//                 <div className="mb-4 flex items-center gap-3">
//                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
//                     {product.image || product.categoryIcon}
//                   </div>

//                   <div className="min-w-0">
//                     <h2 className="font-bold text-gray-800">
//                       {product.nameBn}
//                     </h2>

//                     <p className="mt-1 text-xs text-gray-500">
//                       {product.categoryNameBn} · প্রতি{" "}
//                       {product.unit}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Today's price */}
//                 <p className="text-sm text-gray-500">
//                   আজকের দাম
//                 </p>

//                 <div className="mt-1 flex flex-wrap items-center gap-2">
//                   <p className="text-2xl font-bold text-green-700">
//                     ৳{formatPrice(product.today)}
//                   </p>

//                   {product.change && (
//                     <span
//                       className={`rounded-md px-2 py-1 text-xs font-medium ${
//                         product.change.dir === "up"
//                           ? "bg-red-50 text-red-600"
//                           : product.change.dir === "down"
//                             ? "bg-green-50 text-green-700"
//                             : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {product.change.dir === "up"
//                         ? "↑"
//                         : product.change.dir === "down"
//                           ? "↓"
//                           : "–"}{" "}
//                       {product.change.pct}%
//                     </span>
//                   )}
//                 </div>

//                 {/* Price history */}
//                 <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-sm">
//                   <div className="flex justify-between gap-2">
//                     <span className="text-gray-500">
//                       গতকালের দাম
//                     </span>
//                     <span className="font-medium text-gray-800">
//                       ৳{formatPrice(product.yesterday)}
//                     </span>
//                   </div>

//                   <div className="flex justify-between gap-2">
//                     <span className="text-gray-500">
//                       গত সপ্তাহের দাম
//                     </span>
//                     <span className="font-medium text-gray-800">
//                       ৳{formatPrice(product.lastWeek)}
//                     </span>
//                   </div>

//                   <div className="flex justify-between gap-2">
//                     <span className="text-gray-500">
//                       গত মাসের দাম
//                     </span>
//                     <span className="font-medium text-gray-800">
//                       ৳{formatPrice(product.lastMonth)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Market prices */}
//               <div className="border-t border-gray-100 bg-gray-50 p-4">
//                 <h3 className="mb-3 text-sm font-bold text-gray-800">
//                   বাজারভিত্তিক দাম
//                 </h3>

//                 {product.markets?.length ? (
//                   <div className="space-y-3">
//                     {product.markets.slice(0, 3).map((market) => (
//                       <div
//                         key={`${product.id}-${market.market}`}
//                         className="flex items-start justify-between gap-3"
//                       >
//                         <div className="min-w-0">
//                           <p className="text-xs font-medium text-gray-700">
//                             {market.market}
//                           </p>

//                           <p className="mt-1 text-xs text-gray-500">
//                             {market.division}
//                           </p>
//                         </div>

//                         <p className="shrink-0 text-xs font-semibold text-gray-800">
//                           ৳{formatPrice(market.min)}–
//                           {formatPrice(market.max)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-xs text-gray-500">
//                     বাজারের তথ্য পাওয়া যায়নি।
//                   </p>
//                 )}

//                 {product.markets &&
//                   product.markets.length > 3 && (
//                     <p className="mt-3 text-xs text-gray-500">
//                       আরও {product.markets.length - 3}টি বাজারের তথ্য রয়েছে।
//                     </p>
//                   )}
//               </div>
//             </article>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }




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



