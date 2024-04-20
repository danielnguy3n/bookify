import { useRef, Suspense } from "react";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineStar } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";

import Skeleton from "../UI/Skeleton";

import useAudioDuration from "@/hooks/useAudioDuration";

import { DocumentData } from "firebase/firestore";
import { Book } from "@/typings";

const PremiumPill = () => {
  return <div className="book--pill">Premium</div>;
};

const BookImage = ({ src }: { src: string }) => {
  return (
    <figure className="book__image--wrapper">
      <Suspense fallback={<Skeleton width={172} height={172} />}>
        <Image
          src={src}
          alt=""
          className="book__img"
          width={172}
          height={172}
        />
      </Suspense>
    </figure>
  );
};

const BookHeader = ({
  title,
  author,
  subTitle,
}: {
  title: string;
  author: string;
  subTitle: string;
}) => {
  return (
    <>
      <div className="book__title">{title}</div>
      <div className="book__author">{author}</div>
      <div className="book__subtitle">{subTitle}</div>
    </>
  );
};

const BookDetails = ({
  bookDuration,
  averageRating,
}: {
  bookDuration: string;
  averageRating: number;
}) => {
  return (
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
        <div className="book__details--text">{averageRating}</div>
      </div>
    </div>
  );
};

interface BookCardProps {
  book: Book | DocumentData;
}

function BookCard({ book }: BookCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { bookDuration, onLoadedData } = useAudioDuration(audioRef);

  const {
    audioLink,
    imageLink,
    title,
    author,
    subTitle,
    averageRating,
    id,
    subscriptionRequired,
  } = book;

  const premium = useAppSelector(state => state.user.subscriptionPlan)

  const premiumCondition =
    (premium === "Basic" || !premium) && subscriptionRequired;

  return (
    <Link href={`/book/${id}`} className="book--wrapper">
      <audio src={audioLink} ref={audioRef} onLoadedData={onLoadedData} />
      {premiumCondition && <PremiumPill />}
      <BookImage src={imageLink} />
      <BookHeader {...{ title, author, subTitle }} />
      <BookDetails {...{ bookDuration, averageRating }} />
    </Link>
  );
}

export default BookCard;
