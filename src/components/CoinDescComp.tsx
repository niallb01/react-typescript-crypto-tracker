type CoinDescCompProps = {
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

const CoinDescComp = (props: CoinDescCompProps) => {
  return (
    <>
      <p className="market-cap-rank">
        <strong>Rank: #{props.marketRank}</strong>
      </p>
      <img className="desc-icon" src={props.descImage} alt="crypto" />
      <div className="item-3">
        <p className="coin-name">
          <strong>{props.name}</strong>
        </p>
      </div>
      <div className="item-4">
        <p className="coin-symbol">{props.symbol}</p>
      </div>
      <div className="item-5">
        <p className="coin-price">Price: £{props.coinPrice}</p>
      </div>
      <div className="item-9">
        <p className="market-cap">Mkt Cap: £{props.marketCap}b</p>
      </div>
      <p className="desc-volume">Volume: £{props.descvolume}</p>
      <p className="desc-circulating">
        Circulating Supply: £{props.circulating}
      </p>
      <p className="fully-diluted">
        Fully Diluted Valuation: £{props.fullyDiluted}
      </p>
      <p className="total-supply">Total Supply: £{props.totalSupply}</p>
      <p className="max-supply">Max Supply: £{props.maxSupply}</p>
      <p className="desc-24hr-high">24hr High: £{props.twentyFourHourHigh}</p>
      <p className="desc-24hr-low">24hr Low: £{props.twentyFourHourLow}</p>
      <p className="all-time-high">All Time High: £{props.ath}</p>
      <p className="all-time-low">All Time Low: £{props.atl}</p>
      {/* <p className="desc-text">{props.descText}</p> */}
    </>
  );
};

export default CoinDescComp;
