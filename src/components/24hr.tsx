const TwentyFourHour = (props: any) => {
  return (
    <>
      <div className="item-6">
        {props.twentyFourHour < 0 ? (
          <p className="twenty-four-hours-red">{props.twentyFourHour}%</p>
        ) : (
          <p className="twenty-four-hours-green">{props.twentyFourHour}%</p>
        )}
      </div>
    </>
  );
};

export default TwentyFourHour;
