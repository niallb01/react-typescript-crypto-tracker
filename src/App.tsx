import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pagecomponents/Home";
import Portfolio from "./pagecomponents/Portfolio";
import CoinDescription from "./pagecomponents/CoinDescription";
import CoinData from "./data/CoinData.json";
import CoinDescData from "./data/CoinDescData.json";

type CoinType = {
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
};

type CoinDescType = {
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  atl: number;
  coin_description: string;
  key: string;
  index: number;
  coindesc: string;
};

type PortfolioType = {
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
  total_volume: number;
  item: object;
  coin: string;
  quantity: string | undefined;
  id: string;
  fully_diluted_valuation: number;
  volume: number;
  price_change_24h: number;
  twentyFourHour: number;
  filtered: [];
};

function App() {
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [coinDescription, setDescription] = useState<CoinDescType[]>([]);
  const [portfolio, addPortfolio] = useState<PortfolioType[]>([]);

  // on mount
  useEffect(() => {
    getCoins();
    getCoinsDesc();
  }, []);

  function getCoins() {
    const getCoinData: CoinType[] = CoinData;
    setCoins(getCoinData);
  }

  function getCoinsDesc() {
    const getCoinDescData: CoinDescType[] = CoinDescData;
    setDescription(getCoinDescData);
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              coins={coins}
              portfolio={portfolio}
              addPortfolio={addPortfolio}
            />
          }
        />
        <Route
          path="/coin-description/:coinName"
          element={<CoinDescription coinDescription={coinDescription} />}
        />
        <Route
          path="/portfolio"
          element={
            <Portfolio
              portfolio={portfolio}
              addPortfolio={addPortfolio}
              coins={coins}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
