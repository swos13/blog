"use client";

import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname();

  return (
    <MuiLink
      component={NextLink}
      href={href}
      sx={{
        width: 'auto',
        color: "#ffffff",
        textDecoration: pathname === href ? "underline" : "none",
        textDecorationColor: "#ffffff",
        textUnderlineOffset: "6px",
      }}>
      {children}
    </MuiLink>
  );
}
