const Image = (props) => {
  return (
    <>
      <div className="item-2">
        <img className="crypto-icon" src={props.image} alt="crypto" />
      </div>
    </>
  );
};

export default Image;
