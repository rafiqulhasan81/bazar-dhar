import React from "react";

interface PriceChange {
    dir: "up" | "down" | "flat";
    pct: number;
}

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
    change: PriceChange;
}

const PriceTicker = async () => {

    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
        // https://api.api-store.workers.dev/api/bazardor/products
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch price data");
    }

    const products: Product[] = await res.json();

    return (
        <div className="w-full overflow-hidden border-y border-gray-200 bg-white">

            <div className="ticker-track flex w-max">

                {/* First set */}
                {products.map((product) => (
                    <PriceItem
                        key={product.id}
                        product={product}
                    />
                ))}

                {/* Duplicate set for seamless scrolling */}
                {products.map((product) => (
                    <PriceItem
                        key={`duplicate-${product.id}`}
                        product={product}
                    />
                ))}

            </div>

        </div>
    );
};


const PriceItem = ({ product }: { product: Product }) => {

    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";
    const isFlat = product.change.dir === "flat";

    const unitText =
        product.unit === "kg"
            ? "টাকা/কেজি"
            : product.unit === "litre"
                ? "টাকা/লিটার"
                : product.unit === "dozen"
                    ? "টাকা/ডজন"
                    : "টাকা";


    return (
        <div className="mx-5 flex shrink-0 items-center gap-1 whitespace-nowrap py-2 text-[10px]">

            {/* Icon */}
            <span>
                {product.categoryIcon}
            </span>

            {/* Product name */}
            <span className="font-medium text-gray-700">
                {product.nameBn}
            </span>

            {/* Price */}
            <span className="text-gray-600">
                {product.today} {unitText}
            </span>

            {/* Change */}
            <span
                className={
                    isUp
                        ? "text-red-500"
                        : isDown
                            ? "text-green-600"
                            : "text-gray-400"
                }
            >
                {isUp && "↑"}
                {isDown && "↓"}
                {isFlat && "−"}

                {Math.abs(product.change.pct)}%
            </span>

        </div>
        
    );
};

export default PriceTicker;