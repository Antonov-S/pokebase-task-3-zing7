"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "./ui/button";

function SearchPokemonForm() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText) {
      if (!inputRef.current) {
        return;
      }

      alert("Search text input can't be empty");
      inputRef.current.focus();
      return;
    }

    // onAddItem(itemText);
    setSearchText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-brown2 text-base font-medium">Search Pokemon</h2>
      <input
        ref={inputRef}
        value={searchText}
        onChange={e => {
          setSearchText(e.target.value);
        }}
        type="text"
        autoFocus
        className="h-[45px] w-full border border-[rgba(0,0,0,0.12)] rounded-[5px] my-[12px] mb-[8px] py-0 px-[16px] text-[14px] italic placeholder:italic"
      />
      <Button className="h-[45px] w-full border-none rounded bg-brown3 text-white text-base cursor-pointer flex justify-center items-center transition-all duration-200 hover:bg-brown4">
        Search
      </Button>
    </form>
  );
}

export default SearchPokemonForm;
