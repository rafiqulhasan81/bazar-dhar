
// import Link from "next/link";
// import { notFound } from "next/navigation";

// const API_URL =
//   "https://openapi.programming-hero.com/api/bazardor/products";

// type Product = {
//   id: number | string;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn: string;
//   categoryIcon?: string;
//   unit: string;
//   image?: string;
//   today: number;
//   yesterday: number;
//   lastWeek: number;
//   lastMonth: number;
//   change: {
//     dir: "up" | "down" | "flat";
//     pct: number;
//   };
// };

// async function getProducts(): Promise<Product[]> {
//   const response = await fetch(API_URL, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
//   }

//   const result: unknown = await response.json();

//   if (Array.isArray(result)) {
//     return result as Product[];
//   }

//   if (result && typeof result === "object") {
//     const data = result as {
//       products?: unknown;
//       data?: unknown;
//     };

//     if (Array.isArray(data.products)) {
//       return data.products as Product[];
//     }

//     if (Array.isArray(data.data)) {
//       return data.data as Product[];
//     }
//   }

//   return [];
// }

// function formatPrice(price: number) {
//   return new Intl.NumberFormat("bn-BD", {
//     maximumFractionDigits: 2,
//   }).format(price);
// }

// export default async function ProductDetailsPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   let products: Product[];

//   try {
//     products = await getProducts();
//   } catch {
//     throw new Error("বাজারদরের API থেকে তথ্য লোড করা যায়নি");
//   }

//   const product = products.find(
//     (item) => item.slug === slug || String(item.id) === slug
//   );

//   if (!product) {
//     notFound();
//   }

//   const change = product.change ?? {
//     dir: "flat" as const,
//     pct: 0,
//   };

//   const isUp = change.dir === "up" || change.pct > 0;
//   const isDown = change.dir === "down" || change.pct < 0;

//   return (
//     <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
//       <div className="mx-auto max-w-3xl">
//         <Link
//           href="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3c6248] hover:underline"
//         >
//           ← হোমপেজে ফিরে যান
//         </Link>

//         <section className="rounded-2xl border border-[#dfe8e0] bg-white p-5 shadow-sm sm:p-8">
//           <div className="flex items-center gap-4">
//             {product.image ? (
//               <img
//                 src={product.image}
//                 alt={product.nameBn}
//                 className="h-20 w-20 rounded-xl object-cover"
//               />
//             ) : (
//               <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#eef4ef] text-4xl">
//                 {product.categoryIcon || "🛒"}
//               </div>
//             )}

//             <div className="min-w-0">
//               <p className="text-sm text-[#778078]">
//                 {product.categoryNameBn || product.category || "অন্যান্য"}
//               </p>

//               <h1 className="mt-1 text-2xl font-bold text-[#27332b]">
//                 {product.nameBn}
//               </h1>

//               <p className="mt-1 text-sm text-[#778078]">
//                 প্রতি {product.unit}
//               </p>
//             </div>
//           </div>

//           <div className="mt-7 rounded-xl bg-[#f0f5f0] p-5">
//             <p className="text-sm text-[#778078]">আজকের দাম</p>

//             <p className="mt-1 text-3xl font-bold text-[#27332b]">
//               ৳{formatPrice(product.today)}
//               <span className="ml-2 text-sm font-normal">টাকা</span>
//             </p>

//             <span
//               className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
//                 isUp
//                   ? "bg-red-100 text-red-700"
//                   : isDown
//                     ? "bg-green-100 text-green-700"
//                     : "bg-gray-100 text-gray-600"
//               }`}
//             >
//               {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
//               {formatPrice(Math.abs(change.pct))}%
//               {isUp ? " দাম বেড়েছে" : isDown ? " দাম কমেছে" : " দাম অপরিবর্তিত"}
//             </span>
//           </div>

//           <h2 className="mb-4 mt-8 text-lg font-bold text-[#27332b]">
//             দামের বিস্তারিত
//           </h2>

//           <div className="divide-y divide-[#e5ebe6] rounded-xl border border-[#e5ebe6] px-4">
//             <div className="flex items-center justify-between gap-3 py-4">
//               <span className="text-sm text-[#778078]">আজকের দাম</span>
//               <span className="font-semibold text-[#27332b]">
//                 ৳{formatPrice(product.today)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between gap-3 py-4">
//               <span className="text-sm text-[#778078]">গতকালের দাম</span>
//               <span className="font-semibold text-[#27332b]">
//                 ৳{formatPrice(product.yesterday)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between gap-3 py-4">
//               <span className="text-sm text-[#778078]">গত সপ্তাহের দাম</span>
//               <span className="font-semibold text-[#27332b]">
//                 ৳{formatPrice(product.lastWeek)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between gap-3 py-4">
//               <span className="text-sm text-[#778078]">গত মাসের দাম</span>
//               <span className="font-semibold text-[#27332b]">
//                 ৳{formatPrice(product.lastMonth)}
//               </span>
//             </div>
//           </div>

//           <p className="mt-5 text-xs leading-6 text-[#778078]">
//             প্রদর্শিত দাম API থেকে পাওয়া তথ্যের ভিত্তিতে দেখানো হয়েছে।
//             বাজার ও সময়ভেদে প্রকৃত দাম ভিন্ন হতে পারে।
//           </p>
//         </section>
//       </div>
//     </main>
//   );
// }




// import Image from "next/image";
// import Link from "next/link";
// import { notFound, redirect } from "next/navigation";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";

// const API_URL =
//   "https://openapi.programming-hero.com/api/bazardor/products";

// type Product = {
//   id: number | string;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn: string;
//   categoryIcon?: string;
//   unit: string;
//   image?: string;
//   today: number;
//   yesterday: number;
//   lastWeek: number;
//   lastMonth: number;
//   change: {
//     dir: "up" | "down" | "flat";
//     pct: number;
//   };
// };

// async function getProducts(): Promise<Product[]> {
//   const response = await fetch(API_URL, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error("বাজারদরের ডেটা পাওয়া যায়নি");
//   }

//   const result: unknown = await response.json();

//   if (Array.isArray(result)) {
//     return result as Product[];
//   }

//   if (result && typeof result === "object") {
//     const data = result as {
//       products?: unknown;
//       data?: unknown;
//     };

//     if (Array.isArray(data.products)) {
//       return data.products as Product[];
//     }

//     if (Array.isArray(data.data)) {
//       return data.data as Product[];
//     }
//   }

//   return [];
// }

// function formatPrice(price: number) {
//   return new Intl.NumberFormat("bn-BD", {
//     maximumFractionDigits: 2,
//   }).format(price);
// }

// export default async function ProductDetailsPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   // ১. ব্যবহারকারী লগইন করেছেন কি না যাচাই
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   // ২. লগইন না থাকলে সাইন-ইন পেজে পাঠানো
//   if (!session) {
//     const callbackURL = `/products/${encodeURIComponent(slug)}`;

//     redirect(
//   `/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`
// );
//   }

//   // ৩. লগইন করা থাকলেই পণ্যের তথ্য সংগ্রহ
//   let products: Product[];

//   try {
//     products = await getProducts();
//   } catch {
//     throw new Error("বাজারদরের তথ্য লোড করা যায়নি");
//   }

//   const product = products.find(
//     (item) =>
//       String(item.slug) === slug ||
//       String(item.id) === slug
//   );

//   if (!product) {
//     notFound();
//   }

//   const change = product.change ?? {
//     dir: "flat" as const,
//     pct: 0,
//   };

//   const isUp =
//     change.dir === "up" || change.pct > 0;

//   const isDown =
//     change.dir === "down" || change.pct < 0;

//   const statusClass = isUp
//     ? "bg-red-100 text-red-700"
//     : isDown
//       ? "bg-green-100 text-green-700"
//       : "bg-gray-100 text-gray-600";

//   const imageSrc = product.image?.trim() ?? "";

//   const isValidImage =
//     imageSrc.startsWith("/") ||
//     /^https?:\/\/\S+$/i.test(imageSrc);

//   return (
//     <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
//       <div className="mx-auto max-w-3xl">
//         <Link
//           href="/"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3c6248] hover:underline"
//         >
//           ← হোমপেজে ফিরে যান
//         </Link>

//         <section className="rounded-2xl border border-[#dfe8e0] bg-white p-5 shadow-sm sm:p-8">
//           {/* Product Header */}
//           <div className="flex items-center gap-4">
//             {isValidImage ? (
//               <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#eef4ef]">
//                 <Image
//                   src={imageSrc}
//                   alt={product.nameBn}
//                   fill
//                   sizes="80px"
//                   className="object-contain p-2"
//                 />
//               </div>
//             ) : (
//               <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#eef4ef] text-4xl">
//                 {product.image || product.categoryIcon || "🛒"}
//               </div>
//             )}

//             <div className="min-w-0">
//               <p className="text-sm text-[#778078]">
//                 {product.categoryNameBn ||
//                   product.category ||
//                   "অন্যান্য"}
//               </p>

//               <h1 className="mt-1 text-2xl font-bold text-[#27332b]">
//                 {product.nameBn}
//               </h1>

//               <p className="mt-1 text-sm text-[#778078]">
//                 প্রতি {product.unit}
//               </p>
//             </div>
//           </div>

//           {/* Today's Price */}
//           <div className="mt-7 rounded-xl bg-[#f0f5f0] p-5">
//             <p className="text-sm text-[#778078]">
//               আজকের দাম
//             </p>

//             <p className="mt-1 text-3xl font-bold text-[#27332b]">
//               ৳{formatPrice(product.today)}
//               <span className="ml-2 text-sm font-normal">
//                 টাকা
//               </span>
//             </p>

//             <span
//               className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusClass}`}
//             >
//               {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
//               {formatPrice(Math.abs(change.pct))}%
//               {isUp
//                 ? " দাম বেড়েছে"
//                 : isDown
//                   ? " দাম কমেছে"
//                   : " দাম অপরিবর্তিত"}
//             </span>
//           </div>

//           {/* Price Details */}
//           <h2 className="mb-4 mt-8 text-lg font-bold text-[#27332b]">
//             দামের বিস্তারিত
//           </h2>

//           <div className="divide-y divide-[#e5ebe6] rounded-xl border border-[#e5ebe6] px-4">
//             <div className="flex items-center justify-between gap-3 py-4">
//               <span className="text-sm text-[#778078]">
//                 আজকের দাম
//               </span>
//               <span className="font-semibold text-[#27332b]">
//                 ৳{formatPrice(product.today)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between gap-3 py-4">
//               <span className="text-sm text-[#778078]">
//                 গতকালের দাম
//               </span>
//               <span className="font-semibold text-[#27332b]">
//                 ৳{formatPrice(product.yesterday)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between gap-3 py-4">
//               <span className="text-sm text-[#778078]">
//                 গত সপ্তাহের দাম
//               </span>
//               <span className="font-semibold text-[#27332b]">
//                 ৳{formatPrice(product.lastWeek)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between gap-3 py-4">
//               <span className="text-sm text-[#778078]">
//                 গত মাসের দাম
//               </span>
//               <span className="font-semibold text-[#27332b]">
//                 ৳{formatPrice(product.lastMonth)}
//               </span>
//             </div>
//           </div>

//           <p className="mt-5 text-xs leading-6 text-[#778078]">
//             প্রদর্শিত দাম API থেকে পাওয়া তথ্যের ভিত্তিতে দেখানো হয়েছে।
//             বাজার ও সময়ভেদে প্রকৃত দাম ভিন্ন হতে পারে।
//           </p>

//           <Link
//             href="/"
//             className="mt-6 inline-flex rounded-lg bg-[#315b3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25482f]"
//           >
//             ← সব পণ্যে ফিরে যান
//           </Link>
//         </section>
//       </div>
//     </main>
//   );
// }



// import CategoryProducts from "@/components/CategoryProducts";

// interface Product {
//   id: number | string;
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

//   const apiUrl =
//     `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`;

//   const res = await fetch(apiUrl, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error(
//       `Products API request failed: ${res.status}`
//     );
//   }

//   const result: unknown = await res.json();

//   let allProducts: Product[] = [];

//   if (Array.isArray(result)) {
//     allProducts = result as Product[];
//   } else if (result && typeof result === "object") {
//     const data = result as {
//       products?: unknown;
//       data?: unknown;
//     };

//     if (Array.isArray(data.products)) {
//       allProducts = data.products as Product[];
//     } else if (Array.isArray(data.data)) {
//       allProducts = data.data as Product[];
//     } else if (
//       data.data &&
//       typeof data.data === "object" &&
//       Array.isArray(
//         (data.data as { products?: unknown }).products
//       )
//     ) {
//       allProducts = (
//         data.data as { products: Product[] }
//       ).products;
//     }
//   }

//   const categoryName =
//     allProducts[0]?.categoryNameBn ?? slug;

//   const categoryIcon =
//     allProducts[0]?.categoryIcon ?? "🛒";

//   return (
//     <main className="mx-auto min-h-screen max-w-5xl bg-[#f0f5f0] px-4 py-8">
//       {/* Category Heading */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           {categoryIcon} {categoryName}
//         </h1>

//         <p className="mt-2 text-sm text-gray-500">
//           এই ক্যাটাগরির সব পণ্যের বর্তমান বাজারদর
//         </p>
//       </div>

//       {/* Empty State */}
//       {allProducts.length === 0 ? (
//         <div className="rounded-xl border border-gray-200 bg-white p-6">
//           <h2 className="font-semibold text-gray-800">
//             এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
//           </h2>

//           <p className="mt-2 text-sm text-gray-600">
//             ক্যাটাগরির slug এবং API response পরীক্ষা করুন।
//           </p>
//         </div>
//       ) : (
//         <CategoryProducts products={allProducts} />
//       )}
//     </main>
//   );
// }



interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets?: Market[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function extractProducts(result: unknown): Product[] {
  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (result && typeof result === "object") {
    const data = result as {
      products?: unknown;
      data?: unknown;
    };

    if (Array.isArray(data.products)) {
      return data.products as Product[];
    }

    if (Array.isArray(data.data)) {
      return data.data as Product[];
    }

    if (
      data.data &&
      typeof data.data === "object" &&
      Array.isArray(
        (data.data as { products?: unknown }).products
      )
    ) {
      return (
        data.data as { products: Product[] }
      ).products;
    }
  }

  return [];
}

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি।");
  }

  const result: unknown = await res.json();
  const products = extractProducts(result);

  const product = products.find(
    (item) =>
      String(item.slug) === slug ||
      String(item.id) === slug
  );

  if (!product) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl bg-[#f1f6f2] px-4 py-12">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h1 className="text-xl font-bold text-gray-800">
            পণ্যটি পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            পণ্যের slug অথবা API response যাচাই করুন।
          </p>

          <a
            href="/"
            className="mt-5 inline-block font-semibold text-green-700 hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-8">
      <article className="mx-auto max-w-4xl">
        <a
          href="/"
          className="mb-5 inline-block text-sm text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </a>

        <section className="rounded-2xl border border-[#e0e8e1] bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row">
            {product.image && (
              <img
                src={product.image}
                alt={product.nameBn}
                className="h-44 w-full rounded-xl object-contain sm:w-52"
              />
            )}

            <div className="flex-1">
              <p className="text-sm text-gray-500">
                {product.categoryIcon ?? "🛒"}{" "}
                {product.categoryNameBn || product.category}
              </p>

              <h1 className="mt-2 text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                একক: {product.unit}
              </p>

              <p className="mt-5 text-sm text-gray-500">
                আজকের বাজারদর
              </p>

              <p className="text-3xl font-bold text-green-700">
                ৳{product.today}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                গতকাল: ৳{product.yesterday}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                গত সপ্তাহ: ৳{product.lastWeek}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                গত মাস: ৳{product.lastMonth}
              </p>

              <p
                className={`mt-3 text-sm font-semibold ${
                  product.change?.dir === "down"
                    ? "text-green-700"
                    : product.change?.dir === "up"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {product.change?.dir === "down"
                  ? "▼ দাম কমেছে"
                  : product.change?.dir === "up"
                    ? "▲ দাম বেড়েছে"
                    : "— দাম অপরিবর্তিত"}{" "}
                ({product.change?.pct ?? 0}%)
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e0e8e1] bg-white p-5 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            বাজারভিত্তিক দাম
          </h2>

          {!product.markets?.length ? (
            <p className="mt-4 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক দামের তথ্য API-তে পাওয়া যায়নি।
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {product.markets.map((market, index) => (
                <div
                  key={`${market.market}-${market.division}-${index}`}
                  className="rounded-lg border border-gray-100 p-4"
                >
                  <h3 className="font-semibold text-gray-800">
                    {market.market}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {market.division}
                  </p>

                  <p className="mt-2 text-sm font-medium text-green-700">
                    ৳{market.min} – ৳{market.max}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </main>
  );
}



