import Coin from "../components/Coin";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import CoinDescription from "./CoinDescription";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

type HomeProps = {
  coins: coinType[];
  portfolio: portfolioType[];
  addPortfolio: (portfolio: PortfolioType[]) => void;
};

// type SearchType = {};

const Home = (props: HomeProps) => {
  const [search, setSearch] = useState("");

  // console.log("home", props);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePortfolioItem = (name: string) => {
    const portfolioCopy = [...props.portfolio];
    //all coins we have in portfolio, look at them, if name is equal to one we passed in return it
    const found = portfolioCopy?.find((coin) => {
      return coin.name === name;
    }); //if found remove from array
    if (found) {
      //Remove found coin
      const filtered = portfolioCopy.filter((coin) => {
        return coin.name !== name;
      });
      //Update state
      props.addPortfolio(filtered);
      return;
    }
    portfolioCopy.push({ name: name, quantity: "1" });
    props.addPortfolio(portfolioCopy);
    toast.success("Coin Added To Portfolio", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
      limit: 1,
    });
  };

  const filteredCoins = props.coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });
  // console.log(filteredCoins);
  //if user enters search term use filtered version of coins otherwise use all coins
  const coinsToUse = search ? filteredCoins : props.coins;

  return (
    <>
      <ToastContainer limit={1} />
      <div className="user-coin-search">
        <div className="search-bar">
          <input
            className="search-input"
            list="search-input-2"
            placeholder="Search Currency..."
            onInput={handleSearchInput}
          ></input>
          <datalist id="search-input-2">
            {props.coins.map((coin, coinName) => (
              <option key={coinName}>{coin.name}</option>
            ))}
          </datalist>
        </div>
      </div>

      <div className="portfolio-link">
        Go to
        <Link to="/portfolio">
          <a href="#" className="portfolio-link-text">
            {" "}
            Portfolio {<FaStar className="star-icon-fill" size="10" />}
          </a>
        </Link>
      </div>

      {coinsToUse.map((coin) => {
        return (
          <Link
            to={`/coin-description/${coin.name}`}
            element={<CoinDescription />}
            key={coin.name}
          >
            <div className="coin-container">
              <div className="coin-row">
                <Link to={"#"}>
                  {props.portfolio.find((coinToFind) => {
                    return coinToFind.name === coin.name;
                  }) ? (
                    <FaStar
                      onClick={() => handlePortfolioItem(coin.name)}
                      className="star-icon-fill"
                      size="16"
                      // width={{ width: "10px" }}
                    />
                  ) : (
                    <FaRegStar
                      onClick={() => handlePortfolioItem(coin.name)}
                      className="star-icon"
                      size="16"
                      // width={{ width: "10px" }}
                    />
                  )}
                </Link>

                <Coin
                  id={coin.id}
                  rank={coin.market_cap_rank}
                  image={coin.image}
                  name={coin.name}
                  symbol={coin.symbol.toUpperCase()}
                  marketCap={(coin.market_cap / 1000000000).toFixed(2)}
                  coinPrice={coin.current_price.toFixed(2)}
                  twentyFourHour={coin.price_change_percentage_24h.toFixed(1)}
                  fdv={
                    coin.fully_diluted_valuation
                      ? coin.fully_diluted_valuation.toLocaleString()
                      : "∞"
                  }
                  volume={coin.total_volume.toLocaleString()}
                />
              </div>
            </div>
          </Link>
        );
      })}
      <div className="page-footer"></div>
    </>
  );
};

export default Home;
