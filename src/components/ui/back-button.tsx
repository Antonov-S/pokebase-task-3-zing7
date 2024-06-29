"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="h-[35px] w-[110px] border-none rounded bg-brown3 text-white text-base cursor-pointer flex justify-center items-center transition-all duration-200 hover:bg-brown4 mt-4 ml-4"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
}
