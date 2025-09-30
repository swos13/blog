"use client";
import { useTheme } from "@mui/material/styles";
import { PageLinks } from "../Header";
import { List, ListItem } from "@mui/material";
import ActiveLink from "../ActiveLink";

type DesktopMenuProps = {
  links: PageLinks;
};

export default function DesktopMenu({ links }: DesktopMenuProps) {
  const theme = useTheme();

  return (
    <List
      sx={{
        display: { xs: "none", sm: "flex" },
        justifyContent: "flex-end",
        paddingInline: theme.spacing(1),
      }}>
      {links.map((link, index) => (
        <ListItem key={index} sx={{ width: "fit-content"}}>
          <ActiveLink href={link.href}>{link.title}</ActiveLink>
        </ListItem>
      ))}
    </List>
  );
}
