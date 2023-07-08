"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RiBallPenLine, RiFontSize } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux'
import { setFontSize } from "@/redux/fontSizeSlice";
import { RootState } from "@/redux/store";

interface Props {
  audioNav: Boolean;
}

function Nav({ audioNav }: Props) {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch()

  function switchTabs(tabNum: number, fontSize: number) {
    setActiveTab(tabNum);
    dispatch(setFontSize(fontSize))
  }

  return (
    <nav className="sidebar">
      <div className="sidebar__logo">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={160}
          height={20}
          className=""
        />
      </div>
      <div className={`sidebar__wrapper ${audioNav && `audio__sidebar`}`}>
        <div className="sidebar__top">
          <a href="" className="sidebar__link--wrapper">
            <div className="sidebar__link--line active--tab"></div>
            <div className="sidebar__link--icon">
              <AiOutlineHome />
            </div>
            <div className="sidebar__link--text">For You</div>
          </a>
          <a href="" className="sidebar__link--wrapper ">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__link--icon">
              <BsBookmark />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </a>
          <div className="sidebar__link--wrapper no-link">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__link--icon">
              <RiBallPenLine />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </div>
          <div className="sidebar__link--wrapper no-link">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__link--icon">
              <HiMagnifyingGlass />
            </div>
            <div className="sidebar__link--text">Search</div>
          </div>

          {audioNav && (
            <div className="sidebar__link--wrapper sidebar__fonts">
              <div
                className={`sidebar__font-icon ${
                  activeTab === 1 && `font-size--active`
                }`}
                onClick={() => switchTabs(1, 16)}
              >
                <RiFontSize className="font-s" />
              </div>
              <div
                className={`sidebar__font-icon ${
                  activeTab === 2 && `font-size--active`
                }`}
                onClick={() => switchTabs(2, 18)}
              >
                <RiFontSize className="font-m" />
              </div>
              <div
                className={`sidebar__font-icon ${
                  activeTab === 3 && `font-size--active`
                }`}
                onClick={() => switchTabs(3, 22)}
              >
                <RiFontSize className="font-l" />
              </div>
              <div
                className={`sidebar__font-icon ${
                  activeTab === 4 && `font-size--active`
                }`}
                onClick={() => switchTabs(4, 26)}
              >
                <RiFontSize className="font-xl" />
              </div>
            </div>
          )}
        </div>

        <div className="nav__bot">
          <a href="" className="sidebar__link--wrapper ">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__link--icon">
              <CiSettings />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </a>
          <div className="sidebar__link--wrapper no-link">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__link--icon">
              <AiOutlineQuestionCircle />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </div>
          <a href="" className="sidebar__link--wrapper ">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__link--icon">
              <LuLogOut />
            </div>
            <div className="sidebar__link--text">Login</div>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
