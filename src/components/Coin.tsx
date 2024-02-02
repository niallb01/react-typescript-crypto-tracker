import CoinComp from "./CoinComp";
//child of home component

type CoinProps = {
  id: string;
  rank: string;
  image: string;
  symbol: string;
  name: string;
  coinPrice: number;
  twentyFourHour: number;
  volume: number;
  fdv: number;
  marketCap: number;
};

const Coin = (props: CoinProps) => {
  return (
    <>
      <CoinComp
        rank={props.rank}
        image={props.image}
        symbol={props.symbol}
        name={props.name}
        coinPrice={props.coinPrice}
        twentyFourHour={props.twentyFourHour}
        volume={props.volume}
        fdv={props.fdv}
        marketCap={props.marketCap}
      />
    </>
  );
};

export default Coin;
