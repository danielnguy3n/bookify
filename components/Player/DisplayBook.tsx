import { Book } from "@/typings";
import Image from "next/image";
import { Dispatch, RefObject, SetStateAction } from "react";
import Skeleton from "../UI/Skeleton";

interface Props {
  book?: Book;
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  setDuration: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<Boolean>>;
  loading: Boolean;
  onEnded: Function;
}

function DisplayBook({
  book,
  audioRef,
  progressBarRef,
  setDuration,
  loading,
  setLoading,
  onEnded
}: Props) {
  const onLoadedMetadata = () => {
    if (!audioRef.current) return
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    const strSeconds: string = seconds.toString();
    progressBarRef.current!.max = strSeconds;
    setLoading(false);
  };

  return (
    <div className="audio__track--wrapper">
      <audio src={book?.audioLink} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={() => onEnded()}  />
      <figure className="audio__img--mask">
        <figure className="audio__img--wrapper">
          {loading ? (
            <>
              <Skeleton width={48} height={48} />
            </>
          ) : (
            book?.imageLink && (
              <Image
                src={book?.imageLink}
                alt=""
                className="audio__img"
                width={48}
                height={48}
              />
            )
          )}
        </figure>
      </figure>
      <div className="audio__text">
        {loading ? (
          <>
            <Skeleton width={50} height={16} marginBottom={8} />
            <Skeleton width={100} height={16} />
          </>
        ) : (
          <>
            <div className="audio__title">{book?.title}</div>
            <div className="audio__author">{book?.author}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default DisplayBook;
