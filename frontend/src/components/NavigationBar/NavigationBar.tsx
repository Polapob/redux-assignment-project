import { Box, Stack, Typography, InputBase, Button, Breadcrumbs } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import NavigationSearchBar from "../SearchBar/NavigationSearchBar";
import Link from "next/link";
import NavbarBreadcrumb from "../Breadcrumb/NavbarBreadcrumb";
const NavigationBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#ee4d2d",
      }}
    >
      <NavbarBreadcrumb
        breadcrumbMetadata={[
          { linkTo: "/register", text: "register" },
          { linkTo: "/login", text: "login" },
        ]}
      />
      <Stack
        sx={{
          width: "100%",
          padding: { xl: "1rem 16rem", lg: "1rem 8rem", xs: "1rem 0rem" },
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "3rem",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "0.35rem" }}>
          <ShoppingBagIcon sx={{ fontSize: "52px" }} />
          <Typography sx={{ fontWeight: "bold", fontSize: "32px" }}>Shopee</Typography>
        </Box>
        <NavigationSearchBar />
      </Stack>
    </Box>
  );
};

export default NavigationBar;
