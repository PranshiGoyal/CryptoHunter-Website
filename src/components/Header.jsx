import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const HeaderStyle = styled("div")({
  flex: 1,
  color: "gold",
  cursor: "pointer",
});

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <HeaderStyle>
              <Typography
                onClick={() => navigate("/")}
                fontWeight={900}
                variant="h6"
              >
                Crypto Hunter
              </Typography>
            </HeaderStyle>

            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
