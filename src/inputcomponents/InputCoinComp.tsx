type InputCoinComp = {
  image: string;
  name: string;
  symbol: string;
};

const InputCoinComp = (props: InputCoinComp) => {
  return (
    <>
      <img className="input-crypto-icon" src={props.image} alt="crypto" />
      <p className="input-coin-name">{props.name}</p>
      <p className="input-coin-symbol">({props.symbol})</p>
    </>
  );
};

export default InputCoinComp;
