import React from "react";
import CoinPrice from "./CoinPrice";
import Name from "./Name";
import Image from "./Image";
import MarketCap from "./MarketCap";
import Symbol from "./Symbol";
import Volume from "./Volume";
import Rank from "./Rank";
import TwentyFourHour from "./24hr";
import FDV from "./FDV";

const Coin = (props) => {
  return (
    <>
      <Rank rank={props.rank} />
      <Image image={props.image} />
      <Symbol symbol={props.symbol} />
      <Name name={props.name} />
      <CoinPrice coinPrice={props.coinPrice} />
      <TwentyFourHour twentyFourHour={props.twentyFourHour} />
      <Volume volume={props.volume} />
      <FDV fdv={props.fdv} />
      <MarketCap marketCap={props.marketCap} />
    </>
  );
};

export default Coin;
