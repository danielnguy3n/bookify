"use client";

import { useEffect, useState } from "react";

interface Props {
  alignLeft: boolean;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  heading5: string;
  heading6: string;
}

function StatHeadings({
  alignLeft,
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
}: Props) {
  const [activeHeading, setActiveHeading] = useState<number>(0);

  function updateHeading() {
    setActiveHeading(activeHeading => (activeHeading + 1) % 6);
  }

  useEffect(() => {
    const interval = setInterval(() => updateHeading(), 2000);
    console.log(activeHeading);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`statistics__content--header ${
        alignLeft ? "" : `statistics__content--header-second`
      }`}
    >
      <div
        className={`statistics__heading ${
          activeHeading === 0 && `statistics__heading--active`
        }`}
      >
        {heading1}
      </div>
      <div
        className={`statistics__heading ${
          activeHeading === 1 && `statistics__heading--active`
        }`}
      >
        {heading2}
      </div>
      <div
        className={`statistics__heading ${
          activeHeading === 2 && `statistics__heading--active`
        }`}
      >
        {heading3}
      </div>
      <div
        className={`statistics__heading ${
          activeHeading === 3 && `statistics__heading--active`
        }`}
      >
        {heading4}
      </div>
      <div
        className={`statistics__heading ${
          activeHeading === 4 && `statistics__heading--active`
        }`}
      >
        {heading5}
      </div>
      <div
        className={`statistics__heading ${
          activeHeading === 5 && `statistics__heading--active`
        }`}
      >
        {heading6}
      </div>
    </div>
  );
}

export default StatHeadings;
