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
  duration: number;
  setTimeProgress: Dispatch<SetStateAction<number | undefined>>;
  isPlaying: Boolean;
  setIsPlaying: Dispatch<SetStateAction<Boolean>>;
}

function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  isPlaying,
  setIsPlaying,
}: Props) {
  const playAnimationRef = useRef<number>();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current!.currentTime;
    setTimeProgress(currentTime);
    const currentTimeText: string = currentTime.toString();
    progressBarRef.current!.value = currentTimeText;
    progressBarRef.current!.style.setProperty(
      "--range-progress",
      `${(currentTime / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, []);

  const skipForward = () => {
    audioRef.current!.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current!.currentTime -= 10;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current?.pause();
      cancelAnimationFrame(playAnimationRef.current!);
    }
  }, [isPlaying, audioRef]);

  return (
    <div className="audio__controls--wrapper">
      <div className="audio__controls">
        <button className="audio__controls--btn" onClick={() => skipBackward()}>
          <GrBackTen />
        </button>
        <button
          className="audio__controls--btn audio__controls--btn--play"
          onClick={() => setIsPlaying(!isPlaying)}
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
