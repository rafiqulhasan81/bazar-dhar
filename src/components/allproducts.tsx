
"use client";

import { useState } from "react";
import Link from "next/link";

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

type SortOption =
  | "default"
  | "name"
  | "price-low"
  | "price-high"
  | "change";

type AllProductsProps = {
  products: Product[];
  hasError: boolean;
};

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
    <Link
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
    </Link>
  );
}

export default function AllProducts({
  products,
  hasError,
}: AllProductsProps) {
  const [sortBy, setSortBy] =
    useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.nameBn.localeCompare(b.nameBn, "bn");

      case "price-low":
        return a.today - b.today;

      case "price-high":
        return b.today - a.today;

      case "change":
        return (
          Math.abs(b.change?.pct ?? 0) -
          Math.abs(a.change?.pct ?? 0)
        );

      default:
        return 0;
    }
  });

  return (
    <section
      id="all-products"
      className="mx-auto max-w-4xl scroll-mt-6 px-4 py-10"
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#27332b]">
            <span className="text-xl">🛒</span>
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-[#778078]">
            বাজারের সব পণ্যের আজকের দাম
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm font-medium text-[#59645b]"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="min-w-0 rounded-full border border-[#dce5dd] bg-white px-3 py-2 text-sm font-semibold text-[#3c6248] outline-none transition focus:border-[#3c6248] focus:ring-2 focus:ring-[#3c6248]/15"
          >
            <option value="default">ডিফল্ট</option>
            <option value="name">নাম অনুযায়ী</option>
            <option value="price-low">
              দাম: কম থেকে বেশি
            </option>
            <option value="price-high">
              দাম: বেশি থেকে কম
            </option>
            <option value="change">
              দামের পরিবর্তন
            </option>
          </select>

          <span className="shrink-0 rounded-full bg-[#eef4ef] px-3 py-2 text-xs font-semibold text-[#3c6248]">
            মোট{" "}
            {new Intl.NumberFormat("bn-BD").format(
              products.length
            )}{" "}
            পণ্য
          </span>
        </div>
      </div>

      {hasError ? (
        <p className="rounded-xl bg-white p-4 text-sm text-red-600">
          বাজারদরের ডেটা লোড করা যায়নি।
        </p>
      ) : sortedProducts.length === 0 ? (
        <p className="rounded-xl bg-white p-4 text-sm text-gray-600">
          বর্তমানে কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="large"
            />
          ))}
        </div>
      )}
    </section>
  );
}