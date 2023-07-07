import { Book } from "@/typings";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";

interface Props {
  book: Book;
}

function BookCard({ book }: Props) {
  return (
    <Link href={`/book/${book.id}`} className="book--wrapper">
      {book.subscriptionRequired && <div className="book--pill">Premium</div>}
      <figure className="book__image--wrapper">
        <img src={book.imageLink} alt="" className="book__img" />
      </figure>
      <div className="book__title">{book.title}</div>
      <div className="book__author">{book.author}</div>
      <div className="book__subtitle">{book.subTitle}</div>
      <div className="book__details--wrapper">
        <div className="book__details">
          <div className="book__details--icon">
            <HiOutlineClock />
          </div>
          <div className="book__details--text">3.24</div>
        </div>
        <div className="book__details">
          <div className="book__details--icon">
            <AiOutlineStar />
          </div>
          <div className="book__details--text">{book.averageRating}</div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
