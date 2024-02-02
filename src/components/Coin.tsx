import CoinComp from "./CoinComp";

const Coin = (props) => {
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
