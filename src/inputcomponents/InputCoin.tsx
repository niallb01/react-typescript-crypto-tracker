import InputCoinComp from "./InputCoinComp";
import { InputCoinProps } from "../types/coin_types";

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
