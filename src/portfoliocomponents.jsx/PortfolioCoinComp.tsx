const PortfolioCoinComp = (props) => {
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
        {props.twentyFourHour < 0 ? (
          <p className="twenty-four-hours-red">{props.twentyFourHour}%</p>
        ) : (
          <p className="twenty-four-hours-green">{props.twentyFourHour}%</p>
        )}
      </div>
      <p className="coin-quantity">Quantity: {props.quantity}</p>
      <div className="item-9">
        <p className="market-cap">Mkt Cap: £{props.marketCap}b</p>
      </div>
      <p className="total-value">Total Value: £{props.totalValue}</p>
    </>
  );
};

export default PortfolioCoinComp;
