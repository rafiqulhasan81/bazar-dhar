import Herosec from "@/components/Herosec";
import Link from "next/link";
import AllProducts from "@/components/allproducts";
import CategoryProducts from "@/components/CategoryProducts";
import AuthProductLink from "@/components/AuthProductLink";
import { Suspense } from "react";


const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

type Product = {
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
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("বাজারদরের ডেটা পাওয়া যায়নি");
  }

  const result: unknown = await response.json();

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
  }

  return [];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
}

function getProductHref(product: Product) {
  return `/products/${encodeURIComponent(
    product.slug || String(product.id)
  )}`;
}

// সব সেকশনের জন্য একই ক্লিকেবল কার্ড
function ProductCard({
  product,
  variant = "default",
}: {
  product: Product;
  variant?: "default" | "large";
}) {
  const isDown =
    product.change?.dir === "down" ||
    (product.change?.pct ?? 0) < 0;

  const isUp =
    product.change?.dir === "up" ||
    (product.change?.pct ?? 0) > 0;

  const badgeClass = isDown
    ? "bg-green-100 text-green-700"
    : isUp
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";

  const badgeIcon = isDown ? "▼" : isUp ? "▲" : "—";

  return (
  <AuthProductLink
    href={getProductHref(product)}
    aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
    className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
  >
      <article
        className={`h-full border border-[#dfe8e0] bg-[#fafcfb] transition-all hover:-translate-y-0.5 hover:border-[#b9cdbd] hover:shadow-md ${
          variant === "large"
            ? "rounded-2xl p-4"
            : "rounded-xl p-3"
        }`}
      >
        {/* Product information */}
        <div className="flex items-center gap-3">
          <div
            className={`flex shrink-0 items-center justify-center rounded-xl bg-[#eef4ef] ${
              variant === "large"
                ? "h-12 w-12 text-2xl"
                : "h-9 w-9 text-xl"
            }`}
          >
            {product.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-[#27332b]">
              {product.nameBn}
            </h3>

            {variant === "large" && (
              <p className="mt-1 truncate text-xs text-[#778078]">
                {product.categoryNameBn ||
                  product.category ||
                  "অন্যান্য"}
              </p>
            )}

            {variant === "default" && (
              <p className="text-[11px] text-[#778078]">
                {product.unit}
              </p>
            )}
          </div>
        </div>

        {/* Today's price */}
        <div
          className={`flex items-end justify-between gap-2 ${
            variant === "large" ? "mt-4" : "mt-3"
          }`}
        >
          <div>
            <p
              className={`text-[#778078] ${
                variant === "large" ? "text-xs" : "text-[10px]"
              }`}
            >
              আজকের দাম
            </p>

            <p
              className={`font-bold text-[#26332a] ${
                variant === "large" ? "mt-1 text-xl" : "text-sm"
              }`}
            >
              ৳{formatPrice(product.today)}
              {variant === "default" && (
                <span className="text-[11px] font-normal">
                  {" "}টাকা
                </span>
              )}
            </p>

            {variant === "large" && (
              <p className="mt-1 text-xs text-[#778078]">
                প্রতি {product.unit}
              </p>
            )}
          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${badgeClass}`}
          >
            {badgeIcon}{" "}
            {formatPrice(
              Math.abs(product.change?.pct ?? 0)
            )}
            %
          </span>
        </div>

        {/* Yesterday's price */}
        {variant === "large" && (
          <div className="mt-4 border-t border-[#e5ebe6] pt-3">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-[#778078]">
                গতকালের দাম
              </span>

              <span className="font-medium text-[#27332b]">
                ৳{formatPrice(product.yesterday ?? 0)}
              </span>
            </div>
          </div>
        )}

        <p className="mt-3 text-xs font-medium text-[#3c6248]">
          বিস্তারিত দেখুন →
        </p>
      </article>
    </AuthProductLink>
  );
}

async function HomeContent() {
  let products: Product[] = [];
  let hasError = false;

  try {
    products = await getProducts();
  } catch {
    hasError = true;
  }

  const increasedProducts = products
    .filter(
      (product) =>
        product.change?.dir === "up" ||
        (product.change?.pct ?? 0) > 0
    )
    .slice(0, 6);

  const decreasedProducts = products
    .filter(
      (product) =>
        product.change?.dir === "down" ||
        (product.change?.pct ?? 0) < 0
    )
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <Herosec />

      {/* Today's price increase */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-[#27332b]">
          <span className="text-xs text-red-500">▲</span>
          আজ দাম বেড়েছে
        </h2>

        {hasError ? (
          <p className="rounded-xl bg-white p-4 text-sm text-red-600">
            বাজারদরের ডেটা লোড করা যায়নি। API সংযোগ পরীক্ষা করুন।
          </p>
        ) : increasedProducts.length === 0 ? (
          <p className="rounded-xl bg-white p-4 text-sm text-gray-600">
            বর্তমানে দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {increasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* Today's price decrease */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-[#27332b]">
          <span className="text-green-600">▼</span>
          আজ দাম কমেছে
        </h2>

        {hasError ? (
          <p className="rounded-xl bg-white p-4 text-sm text-red-600">
            বাজারদরের ডেটা লোড করা যায়নি।
          </p>
        ) : decreasedProducts.length === 0 ? (
          <p className="rounded-xl bg-white p-4 text-sm text-gray-600">
            বর্তমানে দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {decreasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* All products */}
      {/* <section
  id="all-products"
  className="mx-auto max-w-4xl scroll-mt-6 px-4 py-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-[#27332b]">
              <span className="text-xl">🛒</span>
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-[#778078]">
              বাজারের সব পণ্যের আজকের দাম
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-[#eef4ef] px-3 py-1 text-xs font-semibold text-[#3c6248]">
            মোট{" "}
            {new Intl.NumberFormat("bn-BD").format(
              products.length
            )}{" "}
            পণ্য
          </span>
        </div>

        {hasError ? (
          <p className="rounded-xl bg-white p-4 text-sm text-red-600">
            বাজারদরের ডেটা লোড করা যায়নি।
          </p>
        ) : products.length === 0 ? (
          <p className="rounded-xl bg-white p-4 text-sm text-gray-600">
            বর্তমানে কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="large"
              />
            ))}
          </div>
        )}
      </section> */}
      {/* All products */}
<AllProducts
  products={products}
  hasError={hasError}
/>

      
        </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f0f5f0]">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center">
            <div className="mb-3 text-4xl">🛒</div>

            <h2 className="text-lg font-bold text-[#27332b]">
              বাজারদরের তথ্য লোড হচ্ছে...
            </h2>

            <p className="mt-2 text-sm text-[#778078]">
              অনুগ্রহ করে একটু অপেক্ষা করুন।
            </p>
          </div>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
