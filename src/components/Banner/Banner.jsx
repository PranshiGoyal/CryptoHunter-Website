import React from "react";
import { styled } from "@mui/system";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const BannerStyle = styled("div")({
  backgroundImage: "url(./banner2.jpg)",
});

const BannerContent = styled("div")({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});
const Tagline = styled("div")({
  height: "40%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

const Banner = () => {
  return (
    <BannerStyle>
      <div>
        <BannerContent>
          <Container>
            <Tagline>
              <div>
                <Typography
                  variant="h2"
                  style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                  }}
                >
                  Crypto Hunter
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{
                    color: "darkgrey",
                    textTransform: "capitalize",
                  }}
                >
                  Get All The info Regarding Your Favorite Crypto Currency
                </Typography>
              </div>
            </Tagline>
            <Carousel />
          </Container>
        </BannerContent>
      </div>
    </BannerStyle>
  );
};

export default Banner;
