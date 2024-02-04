import CoinDescComp from "./CoinDescComp";

type CoinDescProps = {
  marketRank: number;
  descImage: string;
  name: string;
  symbol: string;
  coinPrice: number;
  marketCap: number;
  descvolume: number;
  circulating: number;
  fullyDiluted: number;
  totalSupply: number;
  maxSupply: null;
  twentyFourHourHigh: number;
  twentyFourHourLow: number;
  ath: number;
  atl: number;
  descText: string;
};

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
        descText={props.descText}
      />
    </>
  );
};

export default CoinDesc;
