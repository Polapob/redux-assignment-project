import { debounce } from "lodash";
import { useState, useEffect, useRef, ChangeEventHandler, useCallback } from "react";
import { MockSearchResult } from "../components/SearchBar/NavigationSearchBar";
import mockFilterSearchResult from "../utils/components/SearchBar/mockFilterSearchResult";

const useSearchBar = (handleInputChange: (input: string) => void) => {
  const [filterData, setFilterData] = useState<string[]>(MockSearchResult);
  const debounceSearch = useRef(
    debounce((input: string) => {
      const filterInput = mockFilterSearchResult(input, MockSearchResult);
      setFilterData(filterInput);
    }, 300)
  ).current;
  const handleOnSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      event.preventDefault();
      const changeInput = event.target.value;
      handleInputChange(changeInput);
      debounceSearch(changeInput);
    },
    [debounceSearch, handleInputChange]
  );
  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  return [filterData, handleOnSearchChange] as const;
};

export default useSearchBar;
