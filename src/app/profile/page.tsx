"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  // লগইন করা ইউজারের নাম ফর্মে বসানো
  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user?.name]);

  // প্রোফাইলের নাম আপডেট
  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newName = name.trim();

    if (!newName) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    if (newName === user?.name) {
      toast.info("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsSaving(true);

    try {
      const result = await authClient.updateUser({
        name: newName,
      });

      if (result.error) {
        toast.error(
          result.error.message || "নাম আপডেট করা যায়নি।"
        );
        return;
      }

      

      await authClient.getSession();

toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!", {
  containerId: "global-toast",
  autoClose: 2000,
});

setTimeout(() => {
  router.replace("/");
  router.refresh();
}, 2000);
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error instanceof Error
          ? `আপডেট ব্যর্থ: ${error.message}`
          : "আপডেট করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSaving(false);
    }
  }

  // সাইন আউট করে হোম পেজে ফেরত যাওয়া
  async function handleSignOut() {
    if (isSigningOut || isSaving) return;

    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(
          result.error.message ||
            "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!", {
  autoClose: 2500,
});

setTimeout(() => {
  router.replace("/");
  router.refresh();
}, 1500);
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isPending) {
    return <main className="p-8">প্রোফাইল লোড হচ্ছে...</main>;
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-lg p-8">
        <p>প্রোফাইল দেখতে আগে সাইন ইন করুন।</p>

        <button
          type="button"
          onClick={() => router.push("/sign-in")}
          className="mt-4 rounded-md bg-green-700 px-4 py-2 text-white"
        >
          সাইন ইন
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-4 py-10">
      <section className="mx-auto w-full max-w-[552px]">
        <h1 className="text-xl font-bold text-[#26332a]">
          আমার প্রোফাইল
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        {/* ব্যবহারকারীর তথ্য ও সাইন আউট */}
        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-4">
          <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
              <img
                src={user.image}
                alt="প্রোফাইল ছবি"
                className="h-[60px] w-[60px] shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl bg-[#e9eee9] text-xl font-semibold text-green-800">
                {(user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#26332a]">
                {user.name || "ব্যবহারকারী"}
              </p>

              <p className="break-all text-xs text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut || isSaving}
            className="shrink-0 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
          </button>
        </div>

        {/* প্রোফাইল আপডেট */}
        <div className="mt-5 rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-[#26332a]">
            প্রোফাইল আপডেট
          </h2>

          <form onSubmit={handleUpdate} className="mt-5">
            <label
              htmlFor="profile-name"
              className="mb-1 block text-xs font-medium text-[#26332a]"
            >
              আপনার নাম
            </label>

            <input
              id="profile-name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-md border border-[#e0e8e1] bg-transparent px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />

            <button
              type="submit"
              disabled={isSaving || isSigningOut}
              className="mt-3 w-full rounded-md bg-[#078b43] py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#067538] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}








