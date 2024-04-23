import CoinDescComp from "./CoinDescComp";
import { CoinDescProps } from "../types/coin_types";

const CoinDesc = (props: CoinDescProps) => {
  return (
    <>
      <CoinDescComp
        marketRank={props.marketRank}
        descImage={props.descImage}
        name={props.name}
        symbol={props.symbol}
        coinPrice={props.coinPrice}
        marketCap={props.marketCap}
        descvolume={props.descvolume}
        circulating={props.circulating}
        fullyDiluted={props.fullyDiluted}
        totalSupply={props.totalSupply}
        maxSupply={props.maxSupply}
        twentyFourHourHigh={props.twentyFourHourHigh}
        twentyFourHourLow={props.twentyFourHourLow}
        ath={props.ath}
        atl={props.atl}
      />
    </>
  );
};

export default CoinDesc;
