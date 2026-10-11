"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
id: string;
slug: string;
nameBn: string;
icon: string;
}

interface CategoryNavigationProps {
categories: Category[];
}

export default function CategoryNavigation({
categories,
}: CategoryNavigationProps) {
const pathname = usePathname();

return (
    <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="mt-3 flex h-10 items-center gap-5 overflow-x-auto border-t border-gray-100 pt-2"
    >
        {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const isActive = pathname === href;

            return (
                <Link
                    key={category.id}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-xs transition-colors ${
                        isActive
                            ? "bg-green-600 font-bold text-white"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                    }`}
                >
                    <span aria-hidden="true">
                        {category.icon}
                    </span>

                    <span>{category.nameBn}</span>
                </Link>
            );
        })}
    </nav>
);

}