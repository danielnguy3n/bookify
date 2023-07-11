"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RiBallPenLine, RiFontSize } from "react-icons/ri";
import { BsBookmark } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { setFontSize } from "@/redux/fontSizeSlice";
import { openModal } from "@/redux/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AuthModal from "./AuthModal";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { signOutUser } from "@/redux/userSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  audioNav: Boolean;
}

function Nav({ audioNav }: Props) {
  const [activeTab, setActiveTab] = useState(1);
  const modalOpen = useAppSelector((state) => state.modals.modalOpen);
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();

  function switchTabs(tabNum: number, fontSize: number) {
    setActiveTab(tabNum);
    dispatch(setFontSize(fontSize));
  }

  async function handleSignOut() {
    signOut(auth);
    dispatch(signOutUser());
  }

  const pathName = usePathname();
  console.log(pathName.startsWith("/book"));

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
          <Link href="/for-you" className="sidebar__link--wrapper">
            <div
              className={`sidebar__link--line ${
                pathName.startsWith("/for-you") && `active--tab`
              } `}
            ></div>
            <div className="sidebar__link--icon">
              <AiOutlineHome />
            </div>
            <div className="sidebar__link--text">For You</div>
          </Link>
          <Link href="/library" className="sidebar__link--wrapper ">
            <div
              className={`sidebar__link--line ${
                pathName.startsWith("/library") && `active--tab`
              } `}
            ></div>
            <div className="sidebar__link--icon">
              <BsBookmark />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </Link>
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
          <Link href="/settings" className="sidebar__link--wrapper">
            <div
              className={`sidebar__link--line ${
                pathName.startsWith("/settings") && `active--tab`
              } `}
            ></div>
            <div className="sidebar__link--icon">
              <CiSettings />
            </div>
            <div className="sidebar__link--text">Settings</div>
          </Link>
          <div className="sidebar__link--wrapper no-link">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__link--icon">
              <AiOutlineQuestionCircle />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </div>
          {userEmail ? (
            <div className="sidebar__link--wrapper " onClick={handleSignOut}>
              <div className="sidebar__link--line"></div>
              <div className="sidebar__link--icon">
                <LuLogOut />
              </div>
              <div className="sidebar__link--text">Logout</div>
            </div>
          ) : (
            <div
              className="sidebar__link--wrapper "
              onClick={() => dispatch(openModal())}
            >
              <div className="sidebar__link--line"></div>
              <div className="sidebar__link--icon">
                <LuLogOut />
              </div>
              <div className="sidebar__link--text">Login</div>
            </div>
          )}

          {modalOpen && <AuthModal />}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
