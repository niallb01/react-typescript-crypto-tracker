import EditCoin from "./EditCoin";
import PortfolioCoinComp from "./PortfolioCoinComp";
//this component is child of portfolio - data is being sent down from portfolio
//parent - portfolio is mapping over data

const PortfolioCoin = (props) => {
  return (
    <>
      <PortfolioCoinComp
        rank={props.rank}
        image={props.image}
        symbol={props.symbol}
        name={props.name}
        coinPrice={props.coinPrice}
        twentyFourHour={props.twentyFourHour}
        quantity={props.quantity}
        marketCap={props.marketCap}
        totalValue={props.totalValue.toLocaleString()}
      />
      <EditCoin
        name={props.name}
        onDeletePortfolioCoin={props.onDeletePortfolioCoin}
        onUpdatePortfolioCoin={props.onUpdatePortfolioCoin}
      />
    </>
  );
};

export default PortfolioCoin;
