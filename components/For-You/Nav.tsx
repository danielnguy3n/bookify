import Image from "next/image";
import React from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RiBallPenLine, RiFontSize } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";

interface Props {
  audioNav: Boolean;
}

function Nav({ audioNav }: Props) {
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
              <div className="sidebar__font-icon font-size--active">
                <RiFontSize className="font-s"/>
              </div>
              <div className="sidebar__font-icon ">
                <RiFontSize className="font-m"/>
              </div>
              <div className="sidebar__font-icon ">
                <RiFontSize className="font-l"/>
              </div>
              <div className="sidebar__font-icon ">
                <RiFontSize className="font-xl"/>
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
