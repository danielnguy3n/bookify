import React from "react";
import { useAppDispatch } from "@/redux/store";

import { setFontSize } from "@/redux/fontSizeSlice";
import { RiFontSize } from "react-icons/ri";
import { FONT_SIZES } from "./constants";

interface FontSizeProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  active: boolean;
  name: string;
}

const FontSize = ({ onClick, active, name }: FontSizeProps) => {
  return (
    <div
      className={`sidebar__font-icon ${active && `font-size--active`}`}
      onClick={onClick}
    >
      <RiFontSize className={`font-${name}`} />
    </div>
  );
};

export default function NavFontSizeChanger() {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = React.useState(1);

  function changeFontSize(tabNum: number, fontSize: number) {
    setActiveTab(tabNum);
    dispatch(setFontSize(fontSize));
  }

  return (
    <div className="sidebar__link--wrapper sidebar__fonts">
      {FONT_SIZES.map(({ name, fontSize }, i) => (
        <FontSize
          key={i}
          name={name}
          onClick={() => changeFontSize(i, fontSize)}
          active={activeTab === i}
        />
      ))}
    </div>
  );
}
