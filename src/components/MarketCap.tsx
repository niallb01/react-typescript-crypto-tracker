const MarketCap = (props) => {
  return (
    <>
      <div className="item-9">
        <p className="market-cap">Mkt Cap: £{props.marketCap}b</p>
      </div>
    </>
  );
};

export default MarketCap;
