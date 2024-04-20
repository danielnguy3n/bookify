import { BsStarFill as StarIcon } from "react-icons/bs";

interface Props {
  name: string;
  body: string;
  bold: string;
}

function Review({ name, body, bold }: Props) {
  const splitString = body.split(bold, 2);

  return (
    <div className="review">
      <div className="review__header">
        <div className="review__name">{name}</div>
        <div className="review__stars">
          {new Array(5).fill(0).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
      </div>
      <div className="review__body">
        {splitString[0]}
        <b>{bold}</b>
        {splitString[1]}
      </div>
    </div>
  );
}

export default Review;
