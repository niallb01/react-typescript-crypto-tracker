import Coin from "../components/Coin";
import { Key, useState, useEffect, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { HomeCoinType, HomeProps } from "../types/coin_types";
import { IoSparklesOutline } from "react-icons/io5";
import { Switch, FormGroup, FormControlLabel } from "@mui/material";

const Home = (props: HomeProps) => {
  const [search, setSearch] = useState<string>("");
  const [volume, setVolume] = useState<boolean>(false);
  const [fdv, setFdv] = useState<boolean>(false);
  const [price, setPrice] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const { coins, portfolio, addPortfolio } = props;

  // let dropdownRef = useRef();
  let dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dropdown]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // sorting events
  const onVolumeSort = () => {
    setVolume(!volume);
  };

  const onFdvSort = () => {
    console.log("fdv");
    setFdv(!fdv);
  };

  const onPriceSort = () => {
    console.log("price");
    setPrice(!price);
  };

  const onDropdown = () => {
    console.log("dropdown");
    setDropdown(!dropdown);
  };

  // function which takes a name parameter of type string.
  const handlePortfolioItem = (name: string) => {
    const portfolioCopy = [...portfolio]; // shallow copy of portfolio array, we don't mutate state
    //all coins we have in portfolio, look at them, if name is equal to one we passed in return it
    const found = portfolioCopy?.find((coin) => {
      return coin.name === name;
    }); //if coin found remove from array
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
    console.log(portfolioCopy);
    toast.success("Coin Added To Portfolio", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
  };

  const filteredCoins = coins.filter((coin: HomeCoinType) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  const sortCoinsByVolume = () => {
    return [...filteredCoins].sort((a, b) => b.total_volume - a.total_volume);
  };

  const sortCoinsByFdv = () => {
    return [...filteredCoins].sort(
      (a, b) => b.fully_diluted_valuation - a.fully_diluted_valuation
    );
  };

  const sortCoinsByPrice = () => {
    return [...filteredCoins].sort(
      (a, b) => b.price_change_24h - a.price_change_24h
    );
  };

  let coinsToUse;
  switch (true) {
    case volume:
      coinsToUse = sortCoinsByVolume();
      break;
    case fdv:
      coinsToUse = sortCoinsByFdv();
      break;
    case price:
      coinsToUse = sortCoinsByPrice();
      break;
    default:
      coinsToUse = filteredCoins.length > 0 ? filteredCoins : coins;
      break;
  }

  //if user enters search term use filtered version of coins otherwise use all coins
  // const coinsToUse = search ? filteredCoins : coins;

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

      <div className="portfolio-link-customize">
        <div className="portfolio-link">
          Go to
          <Link to="/portfolio">
            <a href="#" className="portfolio-link-text">
              {" "}
              Portfolio {<FaStar className="star-icon-fill" size="10" />}
            </a>
          </Link>
        </div>
        <div className="dropdown" ref={dropdownRef}>
          <button
            onClick={onDropdown}
            // value={dropdown}
            data-dropdown={dropdown}
            className="customize-modal-btn"
          >
            <IoSparklesOutline />
            Customise
          </button>

          {dropdown && (
            <div className="dropdown-content">
              <p className="dropdown-header">Metrics</p>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={volume}
                      onChange={onVolumeSort}
                      size="small"
                      className="switch-item"
                    />
                  }
                  className="switch-item"
                  label="Volume"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={fdv}
                      onChange={onFdvSort}
                      size="small"
                      className="switch-item"
                    />
                  }
                  className="switch-item"
                  label="FDV"
                />
                <p className="dropdown-header">Price Change</p>
                <FormControlLabel
                  control={
                    <Switch
                      checked={price}
                      onChange={onPriceSort}
                      size="small"
                      className="switch-item"
                    />
                  }
                  label="24hr"
                  className="switch-item"
                  // labelPlacement="start"
                />
              </FormGroup>
            </div>
          )}
        </div>
      </div>
      {/* 
      <div className="portfolio-link">
        Go to
        <Link to="/portfolio" className="portfolio-link-text">
          {" "}
          Portfolio {<FaStar className="star-icon-fill" size="10" />}
        </Link>
      </div> */}
      {/* 
<Link to={`/coin-description/${coin.name}`} key={coin.name}> */}

      {coinsToUse.map((coin: HomeCoinType) => {
        return (
          <div key={coin.name}>
            {dropdown ? (
              <div className="coin-container">
                <div className="coin-row">
                  <Link to={"#"}>
                    {" "}
                    {portfolio.find(
                      (coinToFind: HomeCoinType) =>
                        coinToFind.name === coin.name
                    ) ? (
                      <FaStar
                        title="add-coin"
                        onClick={() => handlePortfolioItem(coin.name)}
                        className="star-icon-fill"
                        size="16"
                      />
                    ) : (
                      <FaRegStar
                        title="add-coin"
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
            ) : (
              <Link to={`/coin-description/${coin.name}`}>
                <div className="coin-container">
                  <div className="coin-row">
                    <Link to={"#"}>
                      {" "}
                      {portfolio.find(
                        (coinToFind: HomeCoinType) =>
                          coinToFind.name === coin.name
                      ) ? (
                        <FaStar
                          title="add-coin"
                          onClick={() => handlePortfolioItem(coin.name)}
                          className="star-icon-fill"
                          size="16"
                        />
                      ) : (
                        <FaRegStar
                          title="add-coin"
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
                      twentyFourHour={coin.price_change_percentage_24h.toFixed(
                        1
                      )}
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
            )}
          </div>
        );
      })}

      <div className="page-footer"></div>
    </>
  );
};

export default Home;
