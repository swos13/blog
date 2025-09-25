import { Box } from "@mui/material";
import { Item as ItemType } from "./Wrapper";

const Item = ({ name, description }: ItemType) => {
  return (
    <Box sx={{ display: 'flex', gap: '16px', backgroundColor: '#769349ff', height: '62px'}}>
      <span>{name}</span>
      <span>{description}</span>
    </Box>
  );
};

export default Item;
