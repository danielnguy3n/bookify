import { Book } from "@/typings";
import DisplayBook from "./DisplayBook";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

interface Props {
  book?: Book;
  setLoading: Dispatch<SetStateAction<Boolean>>;
  loading: Boolean;
}

function AudioPlayer({ book, setLoading, loading }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [timeProgress, setTimeProgress] = useState<number | undefined>(0);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      setUser(user);
    });
  }, []);

  async function onEnded() {
    if (user) {
      await setDoc(doc(db, "users", user.uid, "myFinishedLibrary", book!.id), {
        ...book,
      });
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setTimeProgress(0);
      progressBarRef.current!.value = "0";
      progressBarRef.current!.style.setProperty("--range-progress", `0`);
      setIsPlaying(false);
    }
  }

  return (
    <div className="audio__wrapper">
      <DisplayBook
        {...{
          book,
          audioRef,
          progressBarRef,
          setDuration,
          setLoading,
          loading,
          onEnded,
        }}
      />
      <Controls
        {...{
          audioRef,
          progressBarRef,
          setTimeProgress,
          isPlaying,
          setIsPlaying,
        }}
      />
      <ProgressBar {...{ progressBarRef, audioRef, setTimeProgress, timeProgress, duration }} />
    </div>
  );
}

export default AudioPlayer;
