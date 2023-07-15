import { Book } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiOutlineClock } from "react-icons/hi2";

interface Props {
  result: Book;
}

function SearchResult({ result }: Props) {
  const [bookDuration, setBookDuration] = useState<string>("00:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  const onLoadedData = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (!isNaN(duration)) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);

        const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        const durationString = `${formatMinutes}:${formatSeconds}`;

        setBookDuration(durationString);
      }
    }
  };

  useEffect(() => {
    onLoadedData();
  }, []);

  return (
    <Link href={`book/${result.id}`} className="search__result">
      <audio
        src={result?.audioLink}
        ref={audioRef}
        onLoadedData={onLoadedData}
      ></audio>
      <figure className="search__img--wrapper">
        <Image
          src={result.imageLink}
          alt="Search"
          width={80}
          height={80}
          className="book__img"
        ></Image>
      </figure>
      <div className="search-result__content">
        <div className="search__title">{result.title}</div>
        <div className="search__author">{result.author}</div>
        <div className="search__duration">
          <div className="search__duration--icon">
            <HiOutlineClock />
          </div>
          <div className="search__duration--text">{bookDuration}</div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResult;
