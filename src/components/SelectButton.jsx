import React from "react";
import { Box } from "@mui/material";

const SelectButton = ({ children, onClick, sx }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid gold",
        borderRadius: 1,
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        fontWeight: 500,
        width: "22%",
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default SelectButton;
