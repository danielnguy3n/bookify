import { RefObject, useEffect, useState } from "react";

export default function useAudioDuration(ref: RefObject<HTMLAudioElement>) {
  const [bookDuration, setBookDuration] = useState<string>("00:00");

  const onLoadedData = () => {
    if (ref.current) {
      const duration = ref.current.duration;
      if (!isNaN(duration)) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);

        const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        const durationString = `${formatMinutes}:${formatSeconds}`;

        setBookDuration(durationString);
      }
    }
  };

  useEffect(() => {
    onLoadedData();
  }, []);

  return { bookDuration, onLoadedData };
}
