
// "use client";

// import { useState, type FormEvent } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";

// type SocialProvider = "google" | "github";

// const SignInPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [socialLoading, setSocialLoading] =
//     useState<SocialProvider | null>(null);

//   const router = useRouter();

//   // Google এবং GitHub দিয়ে সাইন ইন
//   const handleSocialSignIn = async (
//     provider: SocialProvider
//   ) => {
//     try {
//       setSocialLoading(provider);

//       const result = await authClient.signIn.social({
//         provider,
//         callbackURL: "/",
//         errorCallbackURL: "/sign-in",
//         newUserCallbackURL: "/",
//       });

//       if (result.error) {
//         toast.error(
//           result.error.message ||
//             "সোশ্যাল সাইন ইন করা যায়নি।"
//         );

//         setSocialLoading(null);
//       }
//     } catch (error) {
//       console.error("Social sign-in error:", error);

//       toast.error(
//         "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
//       );

//       setSocialLoading(null);
//     }
//   };

//   // ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন
//   const handleSubmit = async (
//     event: FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     const form = event.currentTarget;
//     const formData = new FormData(form);

//     const email = String(
//       formData.get("email") ?? ""
//     )
//       .trim()
//       .toLowerCase();

//     const password = String(
//       formData.get("password") ?? ""
//     );

//     if (!email || !password) {
//       toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await authClient.signIn.email({
//         email,
//         password,
//       });

//       if (result.error) {
//         toast.error(
//           result.error.message ||
//             "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
//         );
//         return;
//       }

//       if (result.data) {
//         toast.success("সফলভাবে সাইন ইন হয়েছে!");

//         router.push("/");
//         router.refresh();
//       } else {
//         toast.error(
//           "সাইন ইন সম্পন্ন হয়েছে কি না নিশ্চিত করা যায়নি।"
//         );
//       }
//     } catch (error) {
//       console.error("Sign-in error:", error);

//       toast.error(
//         "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isBusy = loading || socialLoading !== null;

//   return (
//     <main className="min-h-[calc(100vh-110px)] bg-[#f1f6f2] px-4 py-8 sm:py-10">
//       <section className="mx-auto flex w-full flex-col items-center">
//         {/* Page Heading */}
//         <h1 className="text-center text-2xl font-bold text-[#202a23]">
//           সাইন ইন
//         </h1>

//         <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
//           নির্ভরযোগ্য বাজারদর, বাজার তুলনা ও ট্র্যাকিং পেতে
//           আপনার অ্যাকাউন্টে প্রবেশ করুন।
//         </p>

//         {/* Sign-in Card */}
//         <div className="mt-5 w-full max-w-[340px] rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-[18px] shadow-sm">
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-3"
//           >
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="mb-1 block text-xs font-medium text-[#26332a]"
//               >
//                 ইমেইল
//               </label>

//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 required
//                 disabled={isBusy}
//                 className="w-full rounded-md border border-[#e2e9e3] bg-transparent px-3 py-2.5 text-xs outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="mb-1 block text-xs font-medium text-[#26332a]"
//               >
//                 পাসওয়ার্ড
//               </label>

//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="আপনার পাসওয়ার্ড লিখুন"
//                 autoComplete="current-password"
//                 required
//                 disabled={isBusy}
//                 className="w-full rounded-md border border-[#e2e9e3] bg-transparent px-3 py-2.5 text-xs outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isBusy}
//               className="w-full rounded-md bg-[#078b43] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#067538] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading
//                 ? "সাইন ইন হচ্ছে..."
//                 : "সাইন ইন"}
//             </button>
//           </form>

//           {/* OR Divider */}
//           <div className="my-4 flex items-center gap-3">
//             <div className="h-px flex-1 bg-[#e0e6e1]" />

//             <span className="text-[11px] text-gray-500">
//               অথবা
//             </span>

//             <div className="h-px flex-1 bg-[#e0e6e1]" />
//           </div>

//           {/* Social Sign-in Buttons */}
//           <div className="grid grid-cols-2 gap-2">
//             {/* Google */}
//             <button
//               type="button"
//               onClick={() =>
//                 handleSocialSignIn("google")
//               }
//               disabled={isBusy}
//               className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-[#e0e7e1] px-2 py-2 text-[10px] font-medium text-[#26332a] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <span className="text-sm font-bold text-[#4285F4]">
//                 G
//               </span>

//               <span>
//                 {socialLoading === "google"
//                   ? "সংযোগ হচ্ছে..."
//                   : "Google দিয়ে চালিয়ে যান"}
//               </span>
//             </button>

//             {/* GitHub */}
//             <button
//               type="button"
//               onClick={() =>
//                 handleSocialSignIn("github")
//               }
//               disabled={isBusy}
//               className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-[#e0e7e1] px-2 py-2 text-[10px] font-medium text-[#26332a] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <svg
//                 viewBox="0 0 24 24"
//                 className="h-3.5 w-3.5 shrink-0"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.31-3.75-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.97-.12-.28-.5-1.4.11-2.93 0 0 .94-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.11-1.43 3.05-1.13 3.05-1.13.61 1.53.23 2.65.11 2.93.72.77 1.15 1.76 1.15 2.97 0 4.27-2.61 5.22-5.09 5.5.4.35.75 1.02.75 2.06v3.04c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
//               </svg>

//               <span>
//                 {socialLoading === "github"
//                   ? "সংযোগ হচ্ছে..."
//                   : "GitHub দিয়ে চালিয়ে যান"}
//               </span>
//             </button>
//           </div>

//           {/* Sign-up Link */}
//           <p className="mt-4 text-center text-[11px] text-[#354139]">
//             অ্যাকাউন্ট নেই?{" "}

//             <Link
//               href="/sign-up"
//               className="font-semibold text-[#078b43] hover:underline"
//             >
//               সাইন আপ করুন
//             </Link>
//           </p>
//         </div>

//         {/* Back to Home */}
//         <Link
//           href="/"
//           className="mt-4 text-xs text-gray-500 transition hover:text-green-700"
//         >
//           ← হোম পেজে ফিরে যান
//         </Link>
//       </section>
//     </main>
//   );
// };

// export default SignInPage;


"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

type SocialProvider = "google" | "github";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);

  const router = useRouter();

  // Google এবং GitHub দিয়ে সাইন ইন
  const handleSocialSignIn = async (
    provider: SocialProvider
  ) => {
    try {
      setSocialLoading(provider);

      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
        newUserCallbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            "সোশ্যাল সাইন ইন করা যায়নি।"
        );

        setSocialLoading(null);
      }
    } catch (error) {
      console.error("Social sign-in error:", error);

      toast.error(
        "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
      );

      setSocialLoading(null);
    }
  };

  // ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      formData.get("password") ?? ""
    );

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
      return;
    }

    try {
      setLoading(true);

      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(
          result.error.message ||
            "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      if (result.data) {
  toast.success("সফলভাবে সাইন ইন হয়েছে!");

  form.reset();

  setTimeout(() => {
    router.push("/");
    router.refresh();
  }, 800);
}
      
      else {
        toast.error(
          "সাইন ইন সম্পন্ন হয়েছে কি না নিশ্চিত করা যায়নি।"
        );
      }
    } catch (error) {
      console.error("Sign-in error:", error);

      toast.error(
        "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  const isBusy = loading || socialLoading !== null;

  return (
    <main className="min-h-[calc(100vh-110px)] bg-[#f1f6f2] px-4 py-8 sm:py-10">
      <section className="mx-auto flex w-full flex-col items-center">
        {/* Page Heading */}
        <h1 className="text-center text-2xl font-bold text-[#202a23]">
          সাইন ইন
        </h1>

        <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
          নির্ভরযোগ্য বাজারদর, বাজার তুলনা ও ট্র্যাকিং পেতে
          আপনার অ্যাকাউন্টে প্রবেশ করুন।
        </p>

        {/* Sign-in Card */}
        <div className="mt-5 w-full max-w-[340px] rounded-xl border border-[#e0e8e1] bg-[#fbfdfb] p-[18px] shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium text-[#26332a]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={isBusy}
                className="w-full rounded-md border border-[#e2e9e3] bg-transparent px-3 py-2.5 text-xs outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-medium text-[#26332a]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                autoComplete="current-password"
                required
                disabled={isBusy}
                className="w-full rounded-md border border-[#e2e9e3] bg-transparent px-3 py-2.5 text-xs outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 disabled:opacity-60"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isBusy}
              className="w-full rounded-md bg-[#078b43] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#067538] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "সাইন ইন হচ্ছে..."
                : "সাইন ইন"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e0e6e1]" />

            <span className="text-[11px] text-gray-500">
              অথবা
            </span>

            <div className="h-px flex-1 bg-[#e0e6e1]" />
          </div>

          {/* Social Sign-in Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {/* Google */}
            <button
              type="button"
              onClick={() =>
                handleSocialSignIn("google")
              }
              disabled={isBusy}
              className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-[#e0e7e1] px-2 py-2 text-[10px] font-medium text-[#26332a] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-sm font-bold text-[#4285F4]">
                G
              </span>

              <span>
                {socialLoading === "google"
                  ? "সংযোগ হচ্ছে..."
                  : "Google দিয়ে চালিয়ে যান"}
              </span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() =>
                handleSocialSignIn("github")
              }
              disabled={isBusy}
              className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-[#e0e7e1] px-2 py-2 text-[10px] font-medium text-[#26332a] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.31-3.75-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.97-.12-.28-.5-1.4.11-2.93 0 0 .94-.3 3.05 1.13a10.6 10.6 0 0 1 5.55 0c2.11-1.43 3.05-1.13 3.05-1.13.61 1.53.23 2.65.11 2.93.72.77 1.15 1.76 1.15 2.97 0 4.27-2.61 5.22-5.09 5.5.4.35.75 1.02.75 2.06v3.04c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              <span>
                {socialLoading === "github"
                  ? "সংযোগ হচ্ছে..."
                  : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          {/* Sign-up Link */}
          <p className="mt-4 text-center text-[11px] text-[#354139]">
            অ্যাকাউন্ট নেই?{" "}

            <Link
              href="/sign-up"
              className="font-semibold text-[#078b43] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-4 text-xs text-gray-500 transition hover:text-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
};

export default SignInPage;
