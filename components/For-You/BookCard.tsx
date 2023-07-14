import { auth } from "@/firebase";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { Book } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";

interface Props {
  book: Book;
  premium: string | null;
}

function BookCard({ book, premium }: Props) {
  const [bookDuration, setBookDuration] = useState<string>('00:00')
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const onLoadedData = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration
      const minutes = Math.floor((duration / 60))
      const seconds = Math.floor(duration % 60)

      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      const durationString = `${formatMinutes}:${formatSeconds}`

      setBookDuration(durationString)
    }
  }

  useEffect(() => {
    onLoadedData()
  }, [])

  return (
    <Link href={`/book/${book.id}`} className="book--wrapper">
      <audio src={book?.audioLink} ref={audioRef} onLoadedData={onLoadedData}></audio>
      {(premium === 'Basic' || !premium) && book.subscriptionRequired  && <div className="book--pill">Premium</div>}
      <figure className="book__image--wrapper">
        <Image src={book.imageLink} alt="" className="book__img" fill={true} sizes="(min-width: 400px) 100vw"/>
      </figure>
      <div className="book__title">{book.title}</div>
      <div className="book__author">{book.author}</div>
      <div className="book__subtitle">{book.subTitle}</div>
      <div className="book__details--wrapper">
        <div className="book__details">
          <div className="book__details--icon">
            <HiOutlineClock />
          </div>
          <div className="book__details--text">{bookDuration}</div>
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
