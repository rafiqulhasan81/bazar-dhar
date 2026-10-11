
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-2 px-5 py-4 sm:flex-row sm:items-center sm:px-8 md:px-10">
        <p className="text-xs font-semibold text-[#27332b]">
          বাজার দর- প্রয়োজনীয় পণ্যের দাম এক নজরে
        </p>

        <p className="text-xs leading-relaxed text-gray-500 sm:text-right">
          সকল দাম সম্ভাব্য বাজার ব্যবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
