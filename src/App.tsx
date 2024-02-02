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
  // rank: string;
  // image: string;
  // symbol: string;
  // name: string;
  // coinPrice: number;
  // twentyFourHour: number;
  // volume: number;
  // fdv: number;
  // marketCap: number;
  // //
  // id: string;
  // current_price: number;
  // market_cap_rank: number;
  // fully_diluted_valuation: number;
  // total_volume: number;
  // high_24h: number;
  //
  id: string;
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
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  coin_description: string;
};

type CoinDescType = {
  marketRank: number;
  descImage: string;
  name: string;
  symbol: string;
  coinPrice: number;
  marketCap: number;
  descvolume: number;
  circulating: number;
  fullyDiluted: number;
  totalSupply: number;
  maxSupply: number | null;
  twentyFourHourHigh: number;
  twentyFourHourLow: number;
  ath: number;
  atl: number;
  descText: string;
};

type PortfolioType = {
  name: string;
};

function App() {
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [coinDescription, setDescription] = useState<CoinDescType[]>([]);
  const [portfolio, addPortfolio] = useState<PortfolioType[]>([]);

  // on mount
  useEffect(() => {
    getCoins();
    getCoinsDesc();
    // console.log(typeof portfolio, portfolio);
  }, []);

  // get coin data into state
  function getCoins() {
    const getCoinData: CoinType[] = CoinData;
    setCoins(getCoinData);
    // console.log(typeof getCoinData);
  }
  // get description data into state
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
        <Route
          path="/coin-description/:coinName"
          element={<CoinDescription coinDescription={coinDescription} />}
        />
      </Routes>
    </>
  );
}

export default App;
