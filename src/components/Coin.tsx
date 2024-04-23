import CoinComp from "./CoinComp";
import { CoinProps } from "../types/coin_types";
//child of home component

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
