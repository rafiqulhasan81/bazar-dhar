import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

const Herosec = async () => {
  // Request-এর সময় বর্তমান তারিখ নির্ধারণ
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center overflow-hidden rounded-2xl border border-green-100 bg-[#fdfefd] px-5 py-6 shadow-sm sm:px-8 md:grid-cols-2 md:px-10 md:py-8">

        {/* Left Content */}
        <div className="flex flex-col items-start">

          {/* Dynamic Bangla Date */}
          <span className="mb-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {date}
          </span>

          {/* Heading */}
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও ফলের দাম —
            বাজারভিত্তিক বিশ্লেষণ, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
            দামের পরিবর্তনের এক ঝলক।
          </p>

          {/* All Products Button */}
          <Link
            href="#all-products"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Right Illustration */}
        <div className="mt-6 flex justify-center md:mt-0 md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের বিভিন্ন পণ্যের চিত্র"
            width={230}
            height={170}
            priority
            className="h-auto w-44 object-contain sm:w-52 md:w-56 lg:w-60"
          />
        </div>
      </div>
    </section>
  );
};

export default Herosec;

