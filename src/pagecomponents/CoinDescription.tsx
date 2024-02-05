import CoinDesc from "../components/CoinDesc";
import { useLocation } from "react-router-dom";
import DescText from "../components/DescText";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

type DescriptionProps = {
  // name: string;
  // coinDescription: string;
  // coinDescription: CoinDescType[];
};

type CoinDescriptionType = {
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
  // coinDescription: CoinDescType[];
};

const CoinDescription = (props: DescriptionProps) => {
  const location = useLocation();
  const currentCoin = location.pathname.split("/");
  let coinToShow = props.coinDescription;
  if (currentCoin[2]) {
    coinToShow = props.coinDescription.filter((coin: { name: string }) => {
      return coin.name === currentCoin[2];
    });
  }

  console.log("coindesc", props);
  return (
    <>
      <h4 className="desc-header">All About {currentCoin[2]}</h4>
      <div className="portfolio-link">
        Go to
        <Link to="/portfolio" className="portfolio-link-text">
          {" "}
          Portfolio{" "}
          {
            <FaStar
              className="star-icon-fill"
              size="10"
              // width={{ width: "10px" }}
            />
          }
        </Link>
      </div>

      {coinToShow.map(
        (
          coindesc: CoinDescriptionType,
          // description: CoinDescriptionType,
          index: number
        ) => {
          return (
            <div key={index} className="desc-container">
              <div className="desc-data">
                <CoinDesc
                  key={coindesc.key}
                  marketRank={coindesc.market_cap_rank}
                  descImage={coindesc.image}
                  name={coindesc.name}
                  symbol={coindesc.symbol.toUpperCase()}
                  marketCap={(coindesc.market_cap / 1000000000).toFixed(2)}
                  coinPrice={coindesc.current_price.toLocaleString()}
                  descvolume={coindesc.total_volume.toLocaleString()}
                  circulating={(
                    coindesc.circulating_supply / 1000000000
                  ).toFixed(4)}
                  fullyDiluted={
                    coindesc.fully_diluted_valuation
                      ? coindesc.fully_diluted_valuation.toLocaleString()
                      : "∞"
                  }
                  totalSupply={
                    coindesc.total_supply
                      ? coindesc.total_supply.toLocaleString()
                      : "∞"
                  }
                  maxSupply={
                    coindesc.max_supply
                      ? coindesc.max_supply.toLocaleString()
                      : "∞"
                  }
                  twentyFourHourHigh={coindesc.high_24h.toLocaleString()}
                  twentyFourHourLow={coindesc.low_24h.toLocaleString()}
                  ath={coindesc.ath.toLocaleString()}
                  atl={coindesc.atl.toLocaleString()}
                  // descText={""}
                />
              </div>

              <div className="coin-desc-text">
                {!coindesc.coin_description ? (
                  <>
                    <h4 className="coin-desc-header">
                      No Description Available
                    </h4>
                  </>
                ) : (
                  <>
                    <h4 className="coin-desc-header">
                      What is {currentCoin[2]}?
                    </h4>
                    <DescText descText={coindesc.coin_description} />
                  </>
                )}
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default CoinDescription;
