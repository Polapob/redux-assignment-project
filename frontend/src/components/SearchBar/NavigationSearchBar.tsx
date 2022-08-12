import { Box, InputBase, Button, Typography, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { debounce } from "lodash";
import mockFilterSearchResult from "../../utils/components/SearchBar/mockFilterSearchResult";
import useInput from "../../hooks/useInput";
import useSearchBar from "../../hooks/useSearchBar";
import SearchResult from "./SearchResult";

export const MockSearchResult = ["book", "bird", "boy", "เครื่องเขียน", "หนังสือ", "rubber", "pencil"];

const NavigationSearchBar = () => {
  const [input, handleInputChange] = useInput("");
  const [filterData, handleOnSearchChange] = useSearchBar(handleInputChange);
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
        onChange={handleOnSearchChange}
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
      <SearchResult input={input} filterData={filterData} />
    </Box>
  );
};

export default NavigationSearchBar;
