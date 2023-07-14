'use client'

import { Book } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";

interface Props {
  data: Book[];
}

function SelectedBook({ data }: Props) {
  const book = data[0];

  const [bookDuration, setBookDuration] = useState<string>('0 mins 00 secs')
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const onLoadedData = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration
      const minutes = Math.floor((duration / 60))
      const seconds = Math.floor(duration % 60)

      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      const durationString = `${minutes} mins ${formatSeconds} secs`

      setBookDuration(durationString)
    }
  }

  useEffect(() => {
    onLoadedData()
  }, [])


  return (
    <Link href={`book/${book.id}`} className="selected__book">
      <audio src={book.audioLink} ref={audioRef} onLoadedData={onLoadedData}></audio>
      <div className="selected__book--subtitle">{book.subTitle}</div>
      <div className="selected__book--divider"></div>
      <div className="selected__book--content">
        <figure className="selected-book__image--wrapper">
          <Image
            src={book.imageLink}
            alt=""
            className="book--img"
            width={140}
            height={140}
          />
        </figure>
        <div className="selected__book--text">
          <div className="selected__book--title">{book.title}</div>
          <div className="selected__book--author">{book.author}</div>
          <div className="selected__book--duration-wrapper">
            <div className="selected__book--icon">
              <BsFillPlayCircleFill />
            </div>
            <div className="selected__book--duration">{bookDuration}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SelectedBook;
