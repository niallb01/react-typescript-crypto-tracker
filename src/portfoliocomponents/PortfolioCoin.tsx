import EditCoin from "./EditCoin";
import PortfolioCoinComp from "./PortfolioCoinComp";
//this component is child of portfolio - data is being sent down from portfolio
//parent - portfolio is mapping over data

type PortfolioCoin = {
  rank: number;
  image: string;
  name: string;
  symbol: string;
  coinPrice: string;
  quantity: string | undefined;
  marketCap: string;
  totalValue: any | number;
  twentyFourHour: string;
  onDeletePortfolioCoin: (coin: string) => void;
  onUpdatePortfolioCoin: (name: string, quantity: string) => void;
};

const PortfolioCoin = (props: PortfolioCoin) => {
  const { onDeletePortfolioCoin, onUpdatePortfolioCoin } = props;
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
        totalValue={props.totalValue}
      />
      <EditCoin
        name={props.name}
        onDeletePortfolioCoin={onDeletePortfolioCoin}
        onUpdatePortfolioCoin={onUpdatePortfolioCoin}
        rank={props.rank}
        symbol={props.symbol}
        coinPrice={props.coinPrice}
        twentyFourHour={props.twentyFourHour}
        quantity={props.quantity}
        marketCap={props.marketCap}
        totalValue={props.totalValue}
      />
    </>
  );
};

export default PortfolioCoin;
