import CoinDescComp from "./CoinDescComp";

type CoinDescProps = {
  marketRank: number;
  descImage: string;
  name: string;
  symbol: string;
  coinPrice: string;
  marketCap: string;
  descvolume: string;
  circulating: string;
  fullyDiluted: string;
  totalSupply: string;
  maxSupply: string;
  twentyFourHourHigh: string;
  twentyFourHourLow: string;
  ath: string;
  atl: string;
  // descText: string;
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
        // descText={props.descText}
      />
    </>
  );
};

export default CoinDesc;
