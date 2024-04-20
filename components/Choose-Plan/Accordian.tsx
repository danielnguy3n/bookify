"use client";

import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { CHOOSE_PLAN_FAQ } from "../Global/constants";

interface AccordionCardProps {
  onClick: Function;
  title: string;
  body: string;
  expanded: boolean;
}

const AccordionCard = ({
  onClick,
  title,
  body,
  expanded,
}: AccordionCardProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div className="accordian__card" onClick={handleClick}>
      <div className="accordian__header">
        <div className="accordian__title">{title}</div>
        <BsChevronDown
          className={`accordian__icon ${
            expanded && ` accordian__icon--rotate`
          }`}
        />
      </div>
      <div className={`accordian__collapse ${expanded ? `show` : ""}`}>
        <div className="accordian__inner">
          <div className="accordian__body">{body}</div>
        </div>
      </div>
    </div>
  );
};

function Accordian() {
  const [expanded, setExpanded] = useState<number>(0);

  const handleClick = (id: number) => {
    setExpanded(expanded !== id ? id : 0);
  };

  return (
    <div className="faq__wrapper">
      {CHOOSE_PLAN_FAQ.map(({ title, body, id }) => (
        <AccordionCard
          key={id}
          onClick={() => handleClick(id)}
          title={title}
          body={body}
          expanded={expanded === id}
        />
      ))}
    </div>
  );
}

export default Accordian;
