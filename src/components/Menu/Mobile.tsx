"use client";
import { Box, Drawer, List, ListItem, ListItemButton, useTheme } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { PageLinks } from "../Header";

type MobileMenuProps = {
  links: PageLinks;
};

export default function MobileMenu({ links }: MobileMenuProps) {
  const theme = useTheme();
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorElement);

  const openMenu = (e: React.MouseEvent<HTMLDivElement>) => setAnchorElement(e.currentTarget);

  const closeMenu = () => setAnchorElement(null);

  return (
    <Box sx={{ display: { xs: "flex", sm: "none" } }} alignItems="center" justifyContent="space-between">
      <ListItemButton id="menu-button" sx={{ borderRadius: "50%", px: theme.spacing(1) }} onClick={openMenu}>
        <MenuIcon />
      </ListItemButton>
      <Drawer anchor="left" open={open} onClose={closeMenu} id="mobile-menu">
        <List sx={{ minWidth: "128px" }}>
          {links.map((link, index) => (
            <ListItem key={index} onClick={closeMenu} sx={{ justifyContent: "center" }}>
              <Link href={link.href}>{link.title}</Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
