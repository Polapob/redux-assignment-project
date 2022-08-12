import { Box, InputBase, Button, Typography, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { debounce } from "lodash";
import mockFilterSearchResult from "../../utils/components/SearchBar/mockFilterSearchResult";

const MockSearchResult = ["book", "bird", "boy", "เครื่องเขียน", "หนังสือ", "rubber", "pencil"];

const NavigationSearchBar = () => {
  const [input, setInput] = useState<string>("");
  const [filterData, setFilterData] = useState<string[]>(MockSearchResult);
  const debounceSearch = useRef(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      const filterInput = mockFilterSearchResult(event.target.value, MockSearchResult);
      console.log("filterInput =", filterInput);
      setFilterData(filterInput);
    }, 300)
  ).current;
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      event.preventDefault();
      setInput(event.target.value);
      debounceSearch(event);
    },
    [debounceSearch]
  );

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        columnGap: "1rem",
        width: "100%",
        background: "white",
        padding: "0.1rem 0.25rem",
        borderRadius: "0.25rem",
        position: "relative",
      }}
    >
      <InputBase
        onChange={handleOnChange}
        placeholder="Search somethings"
        sx={{ border: "2px solid white", backgroundColor: "white", padding: "0.125rem 1rem", borderRadius: "0.25rem", width: "100%" }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "rgba(238,77,45,1)",
          ":hover": {
            backgroundColor: "rgba(238,77,45,0.9)",
          },
        }}
      >
        <SearchIcon />
      </Button>
      {input && (
        <Stack
          sx={{
            position: "absolute",
            top: "48px",
            width: "90%",
            backgroundColor: "white",
            zIndex: 10,
            borderRadius: "0.25rem",
            boxShadow: "0 0 0 2px rgb(0 0 0 / 10%)",
          }}
        >
          <Button sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
            <Image src="/icons/StoreIcon.svg" width="20px" height="20px" alt="picture not found" />
            <Typography textAlign="left" sx={{ width: "100%", padding: "0rem 0.5rem", fontSize: "14px", textTransform: "none" }}>
              Search &quot;{input}&quot; Shops
            </Typography>
          </Button>
          {filterData.map((data, index) => {
            return (
              <Button key={index}>
                <Typography textAlign="left" sx={{ width: "100%", padding: "0rem 0.5rem", fontSize: "14px", textTransform: "none" }}>
                  {data}
                </Typography>
              </Button>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default NavigationSearchBar;
