import { Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface ILinkTypographyInterface {
  href: string;
  children?: ReactNode;
  linkText: string;
}

const LinkTypography = ({ href, children, linkText }: ILinkTypographyInterface) => {
  return (
    <Typography component="span" sx={{ color: "black", fontSize: "1.25rem", fontWeight: "700", textAlign: "center" }}>
      {children}
      <Link href={href}>
        <Typography
          component="span"
          sx={{ textDecoration: "underline", display: "inline-block", margin: "0rem 0.5rem", color: "#FF9966", fontWeight: "700", fontSize: "1.25rem" }}
        >
          {linkText}
        </Typography>
      </Link>
    </Typography>
  );
};

export default LinkTypography;
