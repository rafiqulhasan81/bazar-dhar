import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import CategoryNavigation from "@/components/CategoryNavigation";

import PriceTicker from "./priceTicker";
import HeaderAuth from "@/components/HeaderAuth";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const Header = async () => {
    // বর্তমান তারিখ request-এর সময় নির্ধারণ করবে
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    // API থেকে ক্যাটাগরি সংগ্রহ
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories",
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    const categories: Category[] = await res.json();

    return (
        <>
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-5 py-4 sm:px-8 md:px-10 md:py-3">

                    {/* Top Header */}
                    <div className="flex min-h-12 items-center justify-between gap-3">

                        {/* Logo and Website Name */}
                        <Link
                            href="/"
                            className="flex min-w-0 items-center gap-3"
                            aria-label="বাজার দর হোম পেজ"
                        >
                            <Image
                                className="h-8 w-8 shrink-0 object-contain"
                                height={32}
                                width={32}
                                src="/logo-icon.png"
                                alt="বাজার দর"
                                priority
                            />

                            <div className="min-w-0">
                                <h2 className="text-xl font-bold leading-tight text-[#27332b] sm:text-2xl">
                                    বাজার দর
                                </h2>

                                <p className="mt-1 text-[11px] text-gray-500">
                                    {date}
                                </p>
                            </div>
                        </Link>

                        {/* Authentication */}
                        <div className="flex shrink-0 items-center gap-3">
                            <HeaderAuth />
                        </div>
                    </div>

                    
                    <CategoryNavigation categories={categories} />
                </div>
            </header>

            {/* Product Price Ticker */}
            <PriceTicker />
        </>
    );
};

export default Header;
