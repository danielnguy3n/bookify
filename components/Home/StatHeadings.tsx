"use client";

import { useEffect, useState } from "react";

interface StatHeadingsProps {
  alignLeft?: boolean;
  headings: string[];
}

const Heading = ({ text, active }: { text: string; active: boolean }) => {
  return (
    <div
      className={`statistics__heading ${
        active && `statistics__heading--active`
      }`}
    >
      {text}
    </div>
  );
};

function StatHeadings({ alignLeft = false, headings }: StatHeadingsProps) {
  const [activeHeading, setActiveHeading] = useState<number>(0);

  function updateHeading() {
    setActiveHeading((activeHeading) => (activeHeading + 1) % 6);
  }

  useEffect(() => {
    const interval = setInterval(() => updateHeading(), 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`statistics__content--header ${
        alignLeft ? "" : `statistics__content--header-second`
      }`}
    >
      {headings.map((heading, i) => (
        <Heading key={i} text={heading} active={activeHeading === i} />
      ))}
    </div>
  );
}

export default StatHeadings;
