// import React from "react";
// import CoinPrice from "../components/CoinPrice";
// import Name from "../components/Name";
// import Image from "../components/Image";
// import Symbol from "../components/Symbol";
// import TwentyFourHour from "../components/24hr";
// import Rank from "../components/Rank";
// import Quantity from "./Quantity";
// import TotalValue from "./TotalValue";
// import MarketCap from "../components/MarketCap";
import EditCoin from "./EditCoin";
import PortfolioCoinComp from "./PortfolioCoinComp";
//this component is child of portfolio - data is being sent down from portfolio
//parent - portfolio is mapping over data

const PortfolioCoin = (props) => {
  return (
    <>
      {/* <Rank rank={props.rank} />
      <Image image={props.image} />
      <Symbol symbol={props.symbol} />
      <Name name={props.name} />
      <CoinPrice coinPrice={props.coinPrice} />
      <TwentyFourHour twentyFourHour={props.twentyFourHour} />
      <Quantity quantity={props.quantity} />
      <MarketCap marketCap={props.marketCap} />
      <TotalValue totalValue={props.totalValue.toLocaleString()} /> */}
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
