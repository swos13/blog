import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" p={1} bgcolor="primary.main" marginTop='auto'>
      <Typography variant="body1" textAlign="center" color="white">
        {new Date().getFullYear()}. &copy; All rights reserved
      </Typography>
    </Box>
  );
}
