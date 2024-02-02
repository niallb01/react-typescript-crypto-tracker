const InputCoinComp = (props) => {
  return (
    <>
      <img className="input-crypto-icon" src={props.image} alt="crypto" />
      <p className="input-coin-name">{props.name}</p>
      <p className="input-coin-symbol">({props.symbol})</p>
    </>
  );
};

export default InputCoinComp;
