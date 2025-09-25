'use client';

import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <Card
      role="alert"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 320,
        mt: 2,
        mx: "auto",
        pb: 2,
      }}>
      <CardHeader title="Something went wrong..." />
      <CardContent>
        <Typography variant="body1" color="error">
          {error.message ?? "Unknown error"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" onClick={() => reset()}>
          Reload
        </Button>
      </CardActions>
    </Card>
  );
};

export default Error;
