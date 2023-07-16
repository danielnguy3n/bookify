import { Book } from "@/typings";
import DisplayBook from "./DisplayBook";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface Props {
  book?: Book;
  setLoading: Dispatch<SetStateAction<Boolean>>;
  loading: Boolean
}

function AudioPlayer({ book, setLoading, loading }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [timeProgress, setTimeProgress] = useState<number | undefined>(0)
  const [duration, setDuration] = useState<number>(0)
  
  return (
    <div className="audio__wrapper">
      <DisplayBook {...{book, audioRef, progressBarRef, setDuration, setLoading, loading}} />
      <Controls {...{audioRef, progressBarRef, duration, setTimeProgress}} />
      <ProgressBar {...{progressBarRef, audioRef, timeProgress, duration}} />
    </div>
  );
}

export default AudioPlayer;
