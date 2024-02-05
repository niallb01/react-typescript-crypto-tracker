import InputCoinComp from "./InputCoinComp";

type InputCoinProps = {
  image: string;
  name: string;
  symbol: string;
};

const InputCoin = (props: InputCoinProps) => {
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
