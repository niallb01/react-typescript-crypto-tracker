const MarketRank = (props) => {
  return (
    <>
      <p className="market-cap-rank">
        <strong>Rank: #{props.marketRank}</strong>
      </p>
    </>
  );
};

export default MarketRank;
