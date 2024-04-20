"use client";

import { Suspense, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import { BsFillPlayCircleFill } from "react-icons/bs";

import Skeleton from "../UI/Skeleton";
import useAudioDuration from "@/hooks/useAudioDuration";

import { Book } from "@/typings";
import { DocumentData } from "firebase/firestore";

const BookImage = ({ src }: { src: string }) => {
  return (
    <figure className="selected-book__image--wrapper">
      <Suspense fallback={<Skeleton width={172} height={172} />}>
        <Image
          src={src}
          alt=""
          className="book--img"
          width={140}
          height={140}
        />
      </Suspense>
    </figure>
  );
};

const BookDetails = ({
  title,
  author,
  bookDuration
}: {
  title: string;
  author: string;
  bookDuration: string;
}) => {
  return (
    <div className="selected__book--text">
    <div className="selected__book--title">{title}</div>
    <div className="selected__book--author">{author}</div>
    <div className="selected__book--duration-wrapper">
      <div className="selected__book--icon">
        <BsFillPlayCircleFill />
      </div>
      <div className="selected__book--duration">{bookDuration}</div>
    </div>
  </div>
  );
};

interface SelectedBookProps {
  book: Book | DocumentData;
}

function SelectedBook({ book }: SelectedBookProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { bookDuration, onLoadedData } = useAudioDuration(audioRef);

  const { audioLink, imageLink, title, author, subTitle, id } = book;

  return (
    <Link href={`book/${id}`} className="selected__book">
      <audio src={audioLink} ref={audioRef} onLoadedData={onLoadedData}></audio>
      <div className="selected__book--subtitle">{subTitle}</div>
      <div className="selected__book--divider"></div>
      <div className="selected__book--content">
        <BookImage src={imageLink} />
        <BookDetails {...{ title, author, bookDuration }} />
      </div>
    </Link>
  );
}

export default SelectedBook;
