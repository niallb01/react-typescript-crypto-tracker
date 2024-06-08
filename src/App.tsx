import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import CoinDescription from "./pages/CoinDescription";
import CoinData from "./data/CoinData.json";
import CoinDescData from "./data/CoinDescData.json";
import { CoinType, CoinDescType, PortfolioType } from "./types/coin_types";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProtectedRoute from "./protectedroutes/ProtectedRoute";

function App() {
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [coinDescription, setDescription] = useState<CoinDescType[]>([]);
  const [portfolio, addPortfolio] = useState<PortfolioType[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [guest, setGuest] = useState<boolean>(false);

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
      <Navbar authenticated={authenticated} guest={guest} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              coins={coins}
              portfolio={portfolio}
              addPortfolio={addPortfolio}
              authenticated={authenticated}
              guest={guest}
            />
          }
        />
        <Route
          path="/coin-description/:coinName"
          element={<CoinDescription coinDescription={coinDescription} />}
        />
        {/* <Route
          path="/portfolio"
          element={
            <Portfolio
              portfolio={portfolio}
              addPortfolio={addPortfolio}
              coins={coins}
            />
          }
        /> */}
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute authenticated={authenticated} guest={guest}>
              <Portfolio
                portfolio={portfolio}
                addPortfolio={addPortfolio}
                coins={coins}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              guest={guest}
              setGuest={setGuest}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              guest={guest}
              setGuest={setGuest}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
