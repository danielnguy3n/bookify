import { Book } from "@/typings";
import { BsFillPlayCircleFill } from "react-icons/bs";

interface Props {
  data: Book[];
}

function SelectedBook({ data }: Props) {
    const book = data[0]
  return (
    <a href="" className="selected__book">
      <div className="selected__book--subtitle">
        {book.subTitle}
      </div>
      <div className="selected__book--divider"></div>
      <div className="selected__book--content">
        <figure className="book__image--wrapper">
          <img src={book.imageLink} alt="" className="selected__book--img" />
        </figure>
        <div className="selected__book--text">
          <div className="selected__book--title">{book.title}</div>
          <div className="selected__book--author">{book.author}</div>
          <div className="selected__book--duration-wrapper">
            <div className="selected__book--icon">
              <BsFillPlayCircleFill />
            </div>
            <div className="selected__book--duration">3 mins 23 secs</div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default SelectedBook;
