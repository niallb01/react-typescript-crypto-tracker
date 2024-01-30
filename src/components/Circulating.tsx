const Circulating = (props) => {
  return (
    <>
      <p className="desc-circulating">
        Circulating Supply: £{props.circulating}
      </p>
    </>
  );
};

export default Circulating;
