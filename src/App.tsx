import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pagecomponents/Home";
import Portfolio from "./pagecomponents/Portfolio";
import CoinDescription from "./pagecomponents/CoinDescription";
import CoinData from "./data/CoinData.json";
import CoinDescData from "./data/CoinDescData.json";
import { CoinType, CoinDescType, PortfolioType } from "./types/coin_types";

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
