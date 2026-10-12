
"use client";

import { toast } from "react-toastify";

export default function ToastTest() {
  return (
    <button
      type="button"
      onClick={() => toast.error("Toast পরীক্ষা সফল হয়েছে!")}
      className="m-4 rounded bg-red-600 px-4 py-2 text-white"
    >
      Test Error Toast
    </button>
  );
}