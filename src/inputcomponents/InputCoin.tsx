import InputCoinComp from "./InputCoinComp";

const InputCoin = (props) => {
  return (
    <>
      <InputCoinComp
        image={props.image}
        name={props.name}
        symbol={props.symbol}
      />
    </>
  );
};

export default InputCoin;
