import { openModal } from "@/redux/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  RefObject,
  useEffect,
  useRef,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { GrBackTen, GrForwardTen } from "react-icons/gr";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface Props {
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  setTimeProgress: Dispatch<SetStateAction<number | undefined>>;
  isPlaying: Boolean;
  setIsPlaying: Dispatch<SetStateAction<Boolean>>;
}

function Controls({
  audioRef,
  progressBarRef,
  setTimeProgress,
  isPlaying,
  setIsPlaying,
}: Props) {
  const playAnimationRef = useRef<number>();
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const dispatch = useAppDispatch()

  const repeat = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current!.currentTime;
      const duration = audioRef.current!.duration
      setTimeProgress(currentTime);

      const currentTimeText: string = currentTime.toString();
      progressBarRef.current!.value = currentTimeText;

      progressBarRef.current!.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, []);

  const skipForward = () => {
    if (isAuth) {
      audioRef.current!.currentTime += 10;
    } else {
      dispatch(openModal())
    }
  };

  const skipBackward = () => {
    if (isAuth) {
      audioRef.current!.currentTime -= 10;
    } else {
      dispatch(openModal())
    }
  };

  const playButton = () => {
    if (isAuth) {
      setIsPlaying(!isPlaying)
    } else {
      dispatch(openModal())
    }
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current?.pause();
      cancelAnimationFrame(playAnimationRef.current!);
    }
  }, [isPlaying, audioRef, repeat]);

  return (
    <div className="audio__controls--wrapper">
      <div className="audio__controls">
        <button className="audio__controls--btn" onClick={() => skipBackward()}>
          <GrBackTen />
        </button>
        <button
          className="audio__controls--btn audio__controls--btn--play"
          onClick={() => playButton()}
        >
          {isPlaying ? (
            <IoPauseSharp />
          ) : (
            <IoPlaySharp className="audio__controls--btn--play--icon" />
          )}
        </button>
        <button className="audio__controls--btn" onClick={() => skipForward()}>
          <GrForwardTen />
        </button>
      </div>
    </div>
  );
}

export default Controls;
