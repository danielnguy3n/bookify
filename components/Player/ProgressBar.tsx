import { openModal } from "@/redux/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Dispatch, RefObject, SetStateAction } from "react";

interface Props {
  progressBarRef: RefObject<HTMLInputElement>;
  audioRef: RefObject<HTMLAudioElement>;
  timeProgress: number | undefined;
  setTimeProgress: Dispatch<SetStateAction<number | undefined>>;
  duration: number | undefined;
}

function ProgressBar({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
  setTimeProgress
}: Props) {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const dispatch = useAppDispatch()

  const handleProgressChange = () => {
      if (!audioRef.current) return
      const time = +progressBarRef.current!.value;
      setTimeProgress(time);
      audioRef.current.currentTime = time;
  
      const duration = audioRef.current.duration
      const updatedTime = (time / duration) * 100
  
      progressBarRef.current!.style.setProperty("--range-progress", `${updatedTime}%`)
  };

  const handleClick = () => {
    if (!isAuth) {
      dispatch(openModal())
    }
  }

  const formatTime = (time: number | undefined) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="audio__progress--wrapper">
      <div className="audio__time">{formatTime(timeProgress)}</div>
      <input
        type="range"
        className="audio__progress--bar"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
        onClick={() => handleClick()}
      />
      <div className="audio__time">{formatTime(duration)}</div>
    </div>
  );
}

export default ProgressBar;
