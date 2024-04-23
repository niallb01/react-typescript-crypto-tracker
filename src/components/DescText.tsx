type DescProps = {
  descText: string;
};

const DescText = (props: DescProps) => {
  return (
    <>
      <p className="desc-text">{props.descText}</p>
    </>
  );
};

export default DescText;
