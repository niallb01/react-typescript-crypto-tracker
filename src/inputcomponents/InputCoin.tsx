// import React from "react";
// import Name from "./Name";
// import Symbol from "./Symbol";
// import Image from "./Image";
import InputCoinComp from "./InputCoinComp";

const InputCoin = (props) => {
  return (
    <>
      {/* <Image image={props.image} />
      <Name name={props.name} />
      <Symbol symbol={props.symbol} /> */}
      <InputCoinComp
        image={props.image}
        name={props.name}
        symbol={props.symbol}
      />
    </>
  );
};

export default InputCoin;
