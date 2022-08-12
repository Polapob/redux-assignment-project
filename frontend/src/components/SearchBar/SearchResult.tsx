import { Stack, Button, Typography } from "@mui/material";
import Image from "next/image";

interface ISearchResultProps {
  input: string;
  filterData: string[];
}

const SearchResult = ({ input, filterData }: ISearchResultProps) => {
  return (
    <>
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
    </>
  );
};
export default SearchResult;
