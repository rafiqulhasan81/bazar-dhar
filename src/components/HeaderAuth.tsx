

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function HeaderAuth() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (isPending) {
    return <div className="h-9 w-24" />;
  }

  // ইউজার লগইন না করলে
  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/sign-in"
          className="text-xs font-medium text-gray-800 hover:text-green-700"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="rounded-md bg-green-700 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-green-800"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  // ইউজার লগইন করা থাকলে
  const user = session.user;

  // সাইন আউট
  
async function handleSignOut() {
  if (isSigningOut) return;

  setIsSigningOut(true);

  try {
    const result = await authClient.signOut();

    if (result.error) {
      toast.error("সাইন আউট করা যায়নি।", {
  containerId: "global-toast",
});
      return;
    }

    setIsOpen(false);

    toast.success("সফলভাবে সাইন আউট করেছেন!", {
  containerId: "global-toast",
});
    setTimeout(() => {
      router.replace("/");
      router.refresh();
    }, 800);
  } catch (error) {
    console.error("Sign out error:", error);

    toast.error(
      "লগআউটের সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।"
    );
  } finally {
    setIsSigningOut(false);
  }
}


  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-label="প্রোফাইল মেনু"
        className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-gray-100"
      >
        {user.image ? (
          <img
            src={user.image}
            alt="প্রোফাইল ছবি"
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-semibold text-green-800">
            {(user.name || user.email || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
        )}

        <span className="max-w-24 truncate text-xs font-medium text-gray-800">
          {user.name || user.email}
        </span>

        <span className="text-xs text-gray-500">⌄</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <div className="border-b border-gray-100 px-3 py-2">
            <p className="truncate text-sm font-semibold text-gray-800">
              {user.name || "ব্যবহারকারী"}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-green-50 hover:text-green-700"
          >
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="mt-1 w-full rounded-lg border-t border-gray-100 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningOut ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
          </button>
        </div>
      )}
    </div>
  );
}

