import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

type BreadcrumbMetadata = {
  text: string;
  linkTo: string;
};

interface IBreadcrumbProps {
  breadcrumbMetadata: BreadcrumbMetadata[];
}

const NavbarBreadcrumb = ({ breadcrumbMetadata }: IBreadcrumbProps) => {
  return (
    <Breadcrumbs data-testid="breadcrumbs-container" aria-label="breadcrumb" sx={{ paddingTop: "1rem", color: "white", fontWeight: "bold" }}>
      {breadcrumbMetadata.length > 0 &&
        breadcrumbMetadata.map((data, index) => {
          const { text, linkTo } = data;
          return (
            <Link href={linkTo} key={index} data-testid={`${text}-link`}>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  ":hover": {
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                  },
                }}
              >
                {text}
              </Typography>
            </Link>
          );
        })}
    </Breadcrumbs>
  );
};

export default NavbarBreadcrumb;
