import DOMPurify from "dompurify";

const DescText = (props) => {
  return (
    <>
      <p
        className="desc-text"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.descText) }}
      />
    </>
  );
};

export default DescText;
