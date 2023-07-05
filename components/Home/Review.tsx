import { BsStarFill } from "react-icons/bs";

interface Props {
  name: string;
  body: string;
  boldText: string;
}

function Review({ name, body, boldText }: Props) {
  const splitString = body.split(boldText, 2);

  return (
    <div className="review">
      <div className="review__header">
        <div className="review__name">{name}</div>
        <div className="review__stars">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
        </div>
      </div>
      <div className="review__body">
        {splitString[0]}
        <b>{boldText}</b>
        {splitString[1]}
      </div>
    </div>
  );
}

export default Review;
