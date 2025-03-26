"use client";

import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cleanParams, cn } from "@/lib/utils";
import FiltersBar from "./FiltersBar";
import FiltersFull from "./FiltersFull";
import { useEffect } from "react";
import { setFilters } from "@/state";

const parseRange = (value: string) =>
  value.split(",").map((value) => (value === "" ? null : Number(value)));

const parseCoordinates = (value: string) => value.split(",").map(Number);

const parseSearchParams = (key: string, value: string) => {
  const parsers: Record<string, (value: string) => any> = {
    priceRange: parseRange,
    squareFeet: parseRange,
    coordinates: parseCoordinates,
  };

  return parsers[key] ? parsers[key](value) : value;
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isFiltersFullOpen } = useAppSelector((state) => state.global);

  useEffect(() => {
    const initialFilters = Array.from(searchParams.entries()).reduce(
      (acc: Record<string, any>, [key, value]) => {
        acc[key] = parseSearchParams(key, value);
        return acc;
      },
      {}
    );
    const cleanedFilters = cleanParams(initialFilters);
    dispatch(setFilters(cleanedFilters));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="w-full mx-auto px-5 flex flex-col"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <FiltersBar />
      <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
        <div
          className={cn(
            "h-full overflow-auto transition-all duration-300 ease-in-out",
            isFiltersFullOpen
              ? "w-3/12 opacity-100 visible"
              : "w-0 opacity-0 invisible"
          )}
        >
          <FiltersFull />
        </div>
        {/* <Map /> */}
        <div className="basis-4/12 overflow-y-auto">{/* <Listings /> */}</div>
      </div>
    </div>
  );
};

export default SearchPage;
