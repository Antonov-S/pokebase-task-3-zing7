"use client";

import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SORTING_TYPES } from "@/lib/constants";

type OptionType = {
  id: string;
  label: string;
  value: string;
  name?: undefined;
};

type SortByProps = {
  type: string | undefined;
};

async function SortBy({ type }: SortByProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    () => {
      const initialType = type || "default";
      return (
        SORTING_TYPES.find(option => option.value === initialType) ||
        SORTING_TYPES[0]
      );
    }
  );

  useEffect(() => {
    const currentType = type || "default";
    setSelectedOption(
      SORTING_TYPES.find(option => option.value === currentType) ||
        SORTING_TYPES[0]
    );
  }, [type]);

  function handleSortBy(option: SingleValue<OptionType>) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (option && option.value) {
      params.set("type", option.value);
    } else {
      params.delete("type");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="px-7 py-3.5 border-b border-black/5 text-xs">
      <Select
        options={SORTING_TYPES}
        value={selectedOption}
        onChange={option => {
          handleSortBy(option);
          setSelectedOption(option as OptionType);
        }}
      />
    </section>
  );
}

export default SortBy;
