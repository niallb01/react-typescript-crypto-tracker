// child of coin
import { CoinCompProps } from "../types/coin_types";

const CoinComp = (props: CoinCompProps) => {
  return (
    <>
      <div className="item-1">
        <p className="rank">{props.rank}</p>
      </div>
      <div className="item-2">
        <img className="crypto-icon" src={props.image} alt="crypto" />
      </div>
      <div className="item-4">
        <p className="coin-symbol">{props.symbol}</p>
      </div>
      <div className="item-3">
        <p className="coin-name">
          <strong>{props.name}</strong>
        </p>
      </div>
      <div className="item-5">
        <p className="coin-price">Price: £{props.coinPrice}</p>
      </div>
      <div className="item-6">
        {props.twentyFourHour < "0" ? (
          <p className="twenty-four-hours-red">{props.twentyFourHour}%</p>
        ) : (
          <p className="twenty-four-hours-green">{props.twentyFourHour}%</p>
        )}
      </div>
      <div className="item-7">
        <p className="coin-volume-24hr">Volume: £{props.volume}</p>
      </div>
      <div className="item-8">
        <p className="fdv">FDV: £{props.fdv}</p>
      </div>
      <div className="item-9">
        <p className="market-cap">Mkt Cap: £{props.marketCap}b</p>
      </div>
    </>
  );
};

export default CoinComp;
