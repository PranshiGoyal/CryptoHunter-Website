import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";
import rateLimit from "axios-rate-limit";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

// Create an axios instance with rate limiting
const http = rateLimit(axios.create(), {
  maxRequests: 5, // Max number of requests
  perMilliseconds: 1000, // Per second
  maxRPS: 5, // Max requests per second
});

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]); // Initialize as an array
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await http.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
        {
          params: {
            vs_currency: currency,
            order: "gecko_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );
      setTrending(data);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
      setTrending([]); // Ensure trending is an array even if there's an error
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  // Styled components
  const CarouselStyle = styled("div")({
    height: "50%",
    display: "flex",
    alignItems: "center",
    marginTop: 50,
  });

  const CarouselItem = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    // background: "rgba(0, 0, 0, 0.5)", // Background color for better visibility
    padding: 10,
    borderRadius: 8,
    margin: "0 10px",
  });

  const CoinImage = styled("img")({
    marginBottom: 10,
  });

  const CoinInfo = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  });

  const CoinSymbol = styled("span")({
    fontSize: 18,
    fontWeight: 600,
    color: "white",
  });

  const CoinPriceChange = styled("span")({
    fontSize: 16,
    color: (props) => (props.profit ? "green" : "red"),
  });

  const CoinPrice = styled("span")({
    fontSize: 22,
    fontWeight: 500,
    color: "white",
  });

  // Ensure trending is an array before mapping
  const items = Array.isArray(trending)
    ? trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
          <CarouselItem key={coin.id}>
            <Link to={`/coins/${coin.id}`}>
              <CoinImage src={coin.image} alt={coin.name} height="80" />
              <CoinInfo>
                <CoinSymbol>{coin?.symbol}</CoinSymbol>
                <CoinPriceChange
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                  }}
                  profit={profit}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </CoinPriceChange>
              </CoinInfo>
              <CoinPrice>
                {symbol}
                {numberWithCommas(coin?.current_price.toFixed(2))}
              </CoinPrice>
            </Link>
          </CarouselItem>
        );
      })
    : [];

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <CarouselStyle>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items.length > 0 ? items : []} // Ensure items is an array
      />
    </CarouselStyle>
  );
};

export default Carousel;
