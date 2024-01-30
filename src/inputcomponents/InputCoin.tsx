import React from "react";
import Name from "./Name";
import Symbol from "./Symbol";
import Image from "./Image";

const InputCoin = (props) => {
  return (
    <>
      <Image image={props.image} />
      <Name name={props.name} />
      <Symbol symbol={props.symbol} />
    </>
  );
};

export default InputCoin;
