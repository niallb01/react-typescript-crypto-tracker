const Volume = (props) => {
  return (
    <>
      <div className="item-7">
        <p className="coin-volume-24hr">Volume: £{props.volume}</p>
      </div>
    </>
  );
};

export default Volume;
