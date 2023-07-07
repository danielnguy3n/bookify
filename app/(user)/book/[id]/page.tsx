import { Book } from "@/typings";
import Image from "next/image";
import { AiOutlineAudio, AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineBookOpen, HiOutlineLightBulb } from "react-icons/hi";

async function getBook(id: string) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  );
  return res.json();
}

async function bookPage({ params }: { params: { id: string } }) {
  const bookId: string = params.id;
  const book: Book = await getBook(bookId);
  return (
    <div className="row">
      <div className="container">
        <div className="inner__wrapper">
          <div className="inner__book">
            <div className="book-info__title">{book.title}</div>
            <div className="book-info__author">{book.author}</div>
            <div className="book-info__subtitle">{book.subTitle}</div>
            <div className="book-info__details--wrapper">
              <div className="book-info__details">
                <div className="book-info__detail">
                  <div className="book-info__detail--icon">
                    <AiOutlineStar />
                  </div>
                  <div className="book-info__detail--text">
                    {book.averageRating} ({book.totalRating} ratings)
                  </div>
                </div>
                <div className="book-info__detail">
                  <div className="book-info__detail--icon">
                    <AiOutlineClockCircle />
                  </div>
                  <div className="book-info__detail--text">03:24</div>
                </div>
                <div className="book-info__detail">
                  <div className="book-info__detail--icon">
                    <AiOutlineAudio />
                  </div>
                  <div className="book-info__detail--text">
                    {book.type}
                  </div>
                </div>
                <div className="book-info__detail">
                  <div className="book-info__detail--icon">
                    <HiOutlineLightBulb />
                  </div>
                  <div className="book-info__detail--text">{book.keyIdeas} Key Ideas</div>
                </div>
              </div>
            </div>
            <div className="book-info__button-wrapper">
              <button className="book-info__button">
                <div className="button__icon">
                  <HiOutlineBookOpen />
                </div>
                <div className="button__text">Read</div>
              </button>
              <button className="book-info__button">
                <div className="button__icon">
                  <AiOutlineAudio />
                </div>
                <div className="button__text">Listen</div>
              </button>
            </div>
            <div className="book-info__bookmark">
              <div className="bookmark__icon">
                <BsBookmark />
              </div>
              <div className="bookmark__text">Add Title to My Library</div>
            </div>
            <div className="book-info__secondary-title">What's It About?</div>
            <div className="book-info__tags-wrapper">
              <div className="book-info__tag">{book.tags[0]}</div>
              <div className="book-info__tag">{book.tags[1]}</div>
            </div>
            <div className="book-info__description">
              {book.bookDescription}
            </div>
            <div className="book-info__secondary-title">About the Author</div>
            <div className="book-info__author-description">
              {book.authorDescription}
            </div>
          </div>

          <div className="inner-book__img--wrapper">
            <figure className="book-info__img--wrapper">
              <Image
                src={book.imageLink}
                alt="Book Image"
                width={300}
                height={300}
                className="book__img"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

export default bookPage;
