const Name = (props: any) => {
  return (
    <>
      <div className="item-3">
        <p className="coin-name">
          <strong>{props.name}</strong>
        </p>
      </div>
    </>
  );
};

export default Name;
