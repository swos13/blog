import { Box } from "@mui/material";
import InnerContainer from "./InnerContainer";

export type Item = {
  name: string;
  description: string;
};

export type Data = {
  id: number;
  name: string;
  items: Item[];
};

const data: Data[] = [
  {
    id: 1,
    name: "Container 1",
    items: [
      {
        name: "Item 1",
        description: "This is item 1",
      },
      {
        name: "Item 2",
        description: "This is item 2",
      },
    ],
  },
  {
    id: 2,
    name: "Container 2",
    items: [
      {
        name: "Item 3",
        description: "This is item 3",
      },
      {
        name: "Item 4",
        description: "This is item 4",
      },
      {
        name: "Item 5",
        description: "This is item 5",
      },
      {
        name: "Item 6",
        description: "This is item 6",
      },
    ],
  },
  {
    id: 3,
    name: "Container 3",
    items: [
      {
        name: "Item 7",
        description: "This is item 7",
      },
      {
        name: "Item 8",
        description: "This is item 8",
      },
    ],
  },
];

const Wrapper = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "grey" }}>
      {data.map((container) => (
        <InnerContainer key={container.id} {...container} />
      ))}
    </Box>
  );
};

export default Wrapper;
