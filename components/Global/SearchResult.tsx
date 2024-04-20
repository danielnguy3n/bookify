import useAudioDuration from "@/hooks/useAudioDuration";
import { Book } from "@/typings";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { HiOutlineClock as ClockIcon } from "react-icons/hi2";

interface Props {
  result: Book | DocumentData;
  setInput: Dispatch<SetStateAction<string>>;
}



function SearchResult({ result, setInput }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { bookDuration, onLoadedData } = useAudioDuration(audioRef);

  const { audioLink, imageLink, title, author, id } = result;

  return (
    <Link
      href={`/book/${id}`}
      className="search__result"
      onClick={() => setInput("")}
    >
      <audio src={audioLink} ref={audioRef} onLoadedData={onLoadedData}></audio>
      <figure className="search__img--wrapper">
        <Image
          src={imageLink}
          alt="Search"
          width={80}
          height={80}
          className="book__img"
        ></Image>
      </figure>
      <div className="search-result__content">
        <div className="search__title">{title}</div>
        <div className="search__author">{author}</div>
        <div className="search__duration">
          <div className="search__duration--icon">
            <ClockIcon />
          </div>
          <div className="search__duration--text">{bookDuration}</div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResult;
