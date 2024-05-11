import Coin from "../components/Coin";
import { Key, useState, useEffect, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { HomeCoinType, HomeProps } from "../types/coin_types";
import { IoSparklesOutline } from "react-icons/io5";
import { SiBaremetrics } from "react-icons/si";
import { CiBitcoin } from "react-icons/ci";
import { Switch, FormGroup, FormControlLabel } from "@mui/material";

const Home = (props: HomeProps) => {
  const [search, setSearch] = useState<string>("");
  const [volume, setVolume] = useState<boolean>(false);
  const [fdv, setFdv] = useState<boolean>(false);
  const [price, setPrice] = useState<boolean>(false);
  const [mktCap, setMktCap] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const { coins, portfolio, addPortfolio } = props;

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

  const onVolumeSort = () => {
    setVolume(!volume);
  };

  const onFdvSort = () => {
    setFdv(!fdv);
  };

  const onPriceSort = () => {
    setPrice(!price);
  };

  const onMktCapSort = () => {
    setMktCap(!mktCap);
  };

  const onDropdown = () => {
    setDropdown(!dropdown);
  };

  const handlePortfolioItem = (name: string) => {
    const portfolioCopy = [...portfolio];
    const found = portfolioCopy?.find((coin) => {
      return coin.name === name;
    });
    if (found) {
      const filtered = portfolioCopy.filter((coin) => {
        return coin.name !== name;
      });
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

  const sortCoinsByMktCap = () => {
    return [...filteredCoins].sort((a, b) => b.market_cap - a.market_cap);
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
    case mktCap:
      coinsToUse = sortCoinsByMktCap();
      break;
    default:
      coinsToUse = filteredCoins.length > 0 ? filteredCoins : coins;
      break;
  }

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
            data-dropdown={dropdown}
            className="customize-modal-btn"
          >
            <IoSparklesOutline />
            Customise
          </button>

          {dropdown && (
            <div className="dropdown-content">
              <FormGroup>
                <p className="dropdown-header">
                  Price Change <CiBitcoin size={20} className="price-icon" />
                </p>

                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      marginRight: "100px",
                    },
                  }}
                  control={
                    <Switch
                      checked={price}
                      onChange={onPriceSort}
                      size="small"
                      className="switch-item"
                      color="primary"
                      id="price"
                    />
                  }
                  label="24hr"
                  labelPlacement="start"
                />
                <p className="dropdown-header">
                  Metrics <SiBaremetrics size={12} className="metric-icon" />
                </p>
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      marginRight: "100px",
                    },
                  }}
                  control={
                    <Switch
                      checked={fdv}
                      onChange={onFdvSort}
                      size="small"
                      className="switch-item"
                      color="primary"
                    />
                  }
                  label="FDV"
                  labelPlacement="start"
                />

                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      marginRight: "100px",
                    },
                  }}
                  control={
                    <Switch
                      checked={mktCap}
                      onChange={onMktCapSort}
                      size="small"
                      className="switch-item"
                      color="primary"
                    />
                  }
                  label="MktCap"
                  labelPlacement="start"
                />

                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      marginRight: "100px",
                    },
                  }}
                  control={
                    <Switch
                      checked={volume}
                      onChange={onVolumeSort}
                      size="small"
                      className="switch-item"
                      color="primary"
                    />
                  }
                  label="Volume"
                  labelPlacement="start"
                />
              </FormGroup>
            </div>
          )}
        </div>
      </div>

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
