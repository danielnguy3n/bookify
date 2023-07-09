import { Book } from "@/typings";
import { Dispatch, RefObject, SetStateAction } from "react";

interface Props {
  book?: Book;
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  setDuration: Dispatch<SetStateAction<number>>;
}

function DisplayBook({ book, audioRef, progressBarRef, setDuration }: Props) {
  const onLoadedData = () => {
    const seconds = audioRef.current!.duration;
    setDuration(seconds);
    const strSeconds: string = seconds.toString();
    progressBarRef.current!.max = strSeconds;
  };

  return (
    <div className="audio__track--wrapper">
      <audio src={book?.audioLink} ref={audioRef} onLoadedData={onLoadedData} />
      <figure className="audio__img--mask">
        <figure className="audio__img--wrapper">
          <img src={book?.imageLink} alt="" className="audio__img" />
        </figure>
      </figure>
      <div className="audio__text">
        <div className="audio__title">{book?.title}</div>
        <div className="audio__author">{book?.author}</div>
      </div>
    </div>
  );
}

export default DisplayBook;
