import { Stack, Box } from "@mui/material";
import { ReactNode } from "react";
import NavigationBar from "../NavigationBar";

interface IFormLayoutWrapperProps {
  children?: ReactNode;
}

const FormLayoutWrapper = ({ children }: IFormLayoutWrapperProps) => {
  return (
    <Stack
      sx={{
        backgroundColor: "white",
        minHeight: "100vh",
        paddingBottom: "3rem",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <NavigationBar />
        {children}
      </Box>
    </Stack>
  );
};

export default FormLayoutWrapper;
