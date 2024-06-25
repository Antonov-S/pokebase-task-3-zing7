"use client";

import Select, { SingleValue } from "react-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORTING_TYPES } from "@/lib/constants";

type OptionType =
  | {
      id: string;
      label: string;
      value: string;
      name?: undefined;
    }
  | {
      name: string;
      id: string;
      label: string;
      value?: undefined;
    };

async function SortBy() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSortBy(selectedOption: SingleValue<OptionType>) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    // params.delete("query");
    if (selectedOption && selectedOption.value) {
      params.set("type", selectedOption.value);
    } else {
      params.delete("type");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="px-7 py-3.5 border-b border-black/5 text-xs">
      <Select
        options={SORTING_TYPES}
        defaultValue={SORTING_TYPES[0]}
        onChange={handleSortBy}
      />
    </section>
  );
}

export default SortBy;
