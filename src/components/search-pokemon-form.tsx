"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

import { Button } from "./ui/button";

function SearchPokemonForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialQuery = searchParams?.get("query") ?? "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const handleSearch = (term: string) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.delete("query");
      params.delete("page");
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          value={searchTerm}
          onChange={handleChange}
          type="text"
          placeholder="Search by name..."
          autoFocus
          className="h-[45px] w-full border border-[rgba(0,0,0,0.12)] rounded-[5px] my-[12px] mb-[8px] py-0 px-[16px] text-[14px] italic placeholder:italic"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-2xl font-bold"
          >
            &times;
          </button>
        )}
      </div>
      <Button
        type="submit"
        className="h-[45px] w-full border-none rounded bg-brown3 text-white text-base cursor-pointer flex justify-center items-center transition-all duration-200 hover:bg-brown4"
      >
        Search
      </Button>
    </form>
  );
}

export default SearchPokemonForm;
