
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="প্রোফাইল মেনু খুলুন"
        className="flex items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-gray-100"
      >
        {/* Avatar */}
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
          <Image
            src="/avatar.png"
            alt="Profile"
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>

        {/* User Name */}
        <span className="max-w-24 truncate text-xs font-medium text-gray-800">
          Rezwan
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`h-3 w-3 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.09 1.032l-4.25 4.5a.75.75 0 0 1-1.09 0l-4.25-4.5a.75.75 0 0 1 .02-1.052Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

          <div className="border-b border-gray-100 px-3 py-2">
            <p className="truncate text-sm font-semibold text-gray-800">
              Rezwan Ahmed
            </p>
            <p className="truncate text-xs text-gray-500">
              rezwanahmed@gmail.com
            </p>
          </div>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="mt-1 block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            আমার প্রোফাইল
          </Link>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            হোম পেজ
          </Link>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              // এখানে পরে Better Auth signOut যুক্ত করবেন।
            }}
            className="mt-1 w-full rounded-lg border-t border-gray-100 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            ↪ সাইন আউট
          </button>

        </div>
      )}
    </div>
  );
}

