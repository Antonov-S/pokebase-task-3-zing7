"use client";

import { useMemo, useState } from "react";
import Select from "react-select";

const sortingOptions = [
  {
    label: "Sort by default",
    value: "default"
  }
];

async function Search() {
  const [sortBy, setSortBy] = useState("default");
  return (
    <section className="px-7 py-3.5 border-b border-black/5 text-xs">
      <Select
        options={sortingOptions}
        defaultValue={sortingOptions[0]}
        onChange={option => {
          if (option === null) {
            return;
          }
          setSortBy(option.value);
        }}
      />
    </section>
  );
}

export default Search;
