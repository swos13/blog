"use client";
import { Box } from "@mui/material";
import { Data } from "./Wrapper";
import { useState } from "react";
import Item from "./Item";
import { motion, AnimatePresence } from "motion/react";

const InnerContainer = ({ id, name, items }: Data) => {
  const [expand, setExpand] = useState(false);

  return (
    <Box className="content-wrapper" component="div">
      <Box
        className="header"
        sx={{ height: "62px", width: "100%", backgroundColor: "#5d5d5d", display: "flex", gap: "12px", alignItems: "center" }}
        onClick={() => setExpand((p) => !p)}>
        <span>{id}</span>
        <span>{name}</span>
      </Box>
      <Box className="content" sx={{ backgroundColor: "white" }}>
        <AnimatePresence>
          {expand && (
            <motion.div
              className="list"
              style={{ display: "flex", flexDirection: "column" }}
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ duration: 1 }}>
              {items.map((item, index) => (
                <Item key={index} {...item} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default InnerContainer;
