import React from "react";
import Name from "./Name";
import MarketCap from "./MarketCap";
import DescImage from "./DescImage";
import Symbol from "./Symbol";
import CoinPrice from "./CoinPrice";
import Circulating from "./Circulating";
import FullyDiluted from "./FullyDiluted";
import TotalSupply from "./TotalSupply";
import MaxSupply from "./MaxSupply";
import TwentyFourHourHigh from "./TwentyFourHourHigh";
import TwentyFourHourLow from "./TwentyFourHourLow";
import MarketRank from "./MarketRank";
import Ath from "./Ath";
import Atl from "./Atl";
import DescVolume from "./DescVolume";
import DescText from "./DescText";

const CoinDesc = (props) => {
  return (
    <>
      <MarketRank marketRank={props.marketRank} />
      <DescImage descImage={props.descImage} />
      <Name name={props.name} />
      <Symbol symbol={props.symbol} />
      <CoinPrice coinPrice={props.coinPrice} />
      <MarketCap marketCap={props.marketCap} />
      <DescVolume descvolume={props.descvolume} />
      <Circulating circulating={props.circulating} />
      <FullyDiluted fullyDiluted={props.fullyDiluted} />
      <TotalSupply totalSupply={props.totalSupply} />
      <MaxSupply maxSupply={props.maxSupply} />
      <TwentyFourHourHigh twentyFourHourHigh={props.twentyFourHourHigh} />
      <TwentyFourHourLow twentyFourHourLow={props.twentyFourHourLow} />
      <Ath ath={props.ath} />
      <Atl atl={props.atl} />
      <DescText descText={props.descText} />
    </>
  );
};

export default CoinDesc;
