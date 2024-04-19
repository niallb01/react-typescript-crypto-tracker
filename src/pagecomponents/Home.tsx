import Coin from "../components/Coin";
import { Key, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

type HomeProps = {
  coins: HomeCoinType[];
  portfolio: HomeCoinType[];
  addPortfolio: (portfolio: HomeCoinType[]) => void;
};

type HomeCoinType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  volume: number;
  price_change_24h: number;
  twentyFourHour: number;
  price_change_percentage_24h: number;
  quantity: string | undefined;
  coin: string;
  filtered: object;
  item: object;
};

const Home = (props: HomeProps) => {
  const [search, setSearch] = useState<string>("");

  const { coins, portfolio, addPortfolio } = props;

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePortfolioItem = (name: string) => {
    const portfolioCopy = [...portfolio];
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
      addPortfolio(filtered);
      return;
    }
    portfolioCopy.push({
      name: name,
      quantity: "1",
      id: "",
      symbol: "",
      image: "",
      current_price: 0,
      market_cap: 0,
      market_cap_rank: 0,
      fully_diluted_valuation: 0,
      total_volume: 0,
      volume: 0,
      price_change_24h: 0,
      twentyFourHour: 0,
      price_change_percentage_24h: 0,
      coin: "",
      filtered: {},
      item: {},
    });
    addPortfolio(portfolioCopy);
    toast.success("Coin Added To Portfolio", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
      // limit: 1,
    });
  };

  // pure func no side effects - test
  const filteredCoins = coins.filter((coin: HomeCoinType) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });
  //if user enters search term use filtered version of coins otherwise use all coins
  const coinsToUse = search ? filteredCoins : coins;

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
            {coins.map(
              (coin: HomeCoinType, coinName: Key | null | undefined) => (
                <option key={coinName}>{coin.name}</option>
              )
            )}
          </datalist>
        </div>
      </div>

      <div className="portfolio-link">
        Go to
        <Link to="/portfolio" className="portfolio-link-text">
          {" "}
          Portfolio {<FaStar className="star-icon-fill" size="10" />}
        </Link>
      </div>

      {coinsToUse.map((coin: HomeCoinType) => {
        return (
          <Link to={`/coin-description/${coin.name}`} key={coin.name}>
            <div className="coin-container">
              <div className="coin-row">
                <Link to={"#"}>
                  {portfolio.find((coinToFind: HomeCoinType) => {
                    return coinToFind.name === coin.name;
                  }) ? (
                    <FaStar
                      title="add-coin"
                      data-testid="add-portfolio-coin"
                      onClick={() => handlePortfolioItem(coin.name)}
                      className="star-icon-fill"
                      size="16"
                    />
                  ) : (
                    <FaRegStar
                      title="add-coin"
                      data-testid="add-portfolio-coin"
                      onClick={() => handlePortfolioItem(coin.name)}
                      className="star-icon"
                      size="16"
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
