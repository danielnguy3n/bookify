import { RefObject } from "react";

interface Props {
  progressBarRef: RefObject<HTMLInputElement>;
  audioRef: RefObject<HTMLAudioElement>;
  timeProgress: number | undefined;
  duration: number | undefined;
}

function ProgressBar({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}: Props) {

  const handleProgressChange = () => {
    const time = +progressBarRef.current!.value;
    audioRef.current!.currentTime = time;
  };

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
      />
      <div className="audio__time">{formatTime(duration)}</div>
    </div>
  );
}

export default ProgressBar;
