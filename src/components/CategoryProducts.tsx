
"use client";

import { useState } from "react";

interface Product {
  id: number | string;
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

type SortOption =
  | "default"
  | "name"
  | "price-low"
  | "price-high"
  | "change";

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

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

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 2,
    }).format(price);

  return (
    <div>
      {/* Sorting Dropdown */}
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#dfe8e0] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          মোট{" "}
          <span className="font-bold text-[#27332b]">
            {new Intl.NumberFormat("bn-BD").format(
              products.length
            )}
          </span>{" "}
          টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="category-product-sort"
            className="shrink-0 text-sm font-medium text-[#59645b]"
          >
            সাজান:
          </label>

          <select
            id="category-product-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="min-w-0 flex-1 rounded-lg border border-[#dce5dd] bg-white px-3 py-2 text-sm text-[#3c6248] outline-none focus:border-[#3c6248] focus:ring-2 focus:ring-green-100 sm:flex-none"
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
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                  {product.image || product.categoryIcon || "🛒"}
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-gray-800">
                    {product.nameBn}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {product.categoryNameBn} · প্রতি{" "}
                    {product.unit}
                  </p>
                </div>
              </div>

              {/* Today's Price */}
              <p className="text-sm text-gray-500">
                আজকের দাম
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <p className="text-2xl font-bold text-green-700">
                  ৳{formatPrice(product.today)}
                </p>

                {product.change && (
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      product.change.dir === "up"
                        ? "bg-red-50 text-red-600"
                        : product.change.dir === "down"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.change.dir === "up"
                      ? "↑"
                      : product.change.dir === "down"
                        ? "↓"
                        : "–"}{" "}
                    {formatPrice(
                      Math.abs(product.change.pct)
                    )}%
                  </span>
                )}
              </div>

              {/* Price History */}
              <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">
                    গতকালের দাম
                  </span>
                  <span className="font-medium text-gray-800">
                    ৳{formatPrice(product.yesterday)}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">
                    গত সপ্তাহের দাম
                  </span>
                  <span className="font-medium text-gray-800">
                    ৳{formatPrice(product.lastWeek)}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">
                    গত মাসের দাম
                  </span>
                  <span className="font-medium text-gray-800">
                    ৳{formatPrice(product.lastMonth)}
                  </span>
                </div>
              </div>
            </div>

            {/* Market Prices */}
            <div className="border-t border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-3 text-sm font-bold text-gray-800">
                বাজারভিত্তিক দাম
              </h3>

              {product.markets?.length ? (
                <div className="space-y-3">
                  {product.markets.slice(0, 3).map((market, index) => (
                    <div
                      key={`${product.id}-${market.market}-${index}`}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-700">
                          {market.market}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {market.division}
                        </p>
                      </div>

                      <p className="shrink-0 text-xs font-semibold text-gray-800">
                        ৳{formatPrice(market.min)}–
                        {formatPrice(market.max)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  বাজারের তথ্য পাওয়া যায়নি।
                </p>
              )}

              {product.markets &&
                product.markets.length > 3 && (
                  <p className="mt-3 text-xs text-gray-500">
                    আরও{" "}
                    {product.markets.length - 3}টি বাজারের তথ্য রয়েছে।
                  </p>
                )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}