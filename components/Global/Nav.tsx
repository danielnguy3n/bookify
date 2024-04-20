"use client";

import Image from "next/image";
import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

import { setAuth } from "@/redux/authSlice";
import { signOutUser } from "@/redux/userSlice";

import { openModal } from "@/redux/modalSlice";

import AuthModal from "./AuthModal/AuthModal";

import { LuLogOut } from "react-icons/lu";
import Logo from "../../public/images/logo.png";

import NavLink from "./NavLink";
import NavFontSizeChanger from "./NavFontSizeChanger";

import { NAV_LINKS } from "./constants";

function Nav() {
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const modalOpen = useAppSelector((state) => state.modals.modalOpen);
  const sidebarOpen = useAppSelector((state) => state.sidebar.sidebarOpen);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  function handleSignOut() {
    signOut(auth);
    dispatch(signOutUser());
    dispatch(setAuth({ isAuth: false }));
  }

  return (
    <>
      {modalOpen && <AuthModal />}
      <nav className={`sidebar ${sidebarOpen && `sidebar__open`}`}>
        <div className="sidebar__logo">
          <a href="/for-you">
            <h1 className="logo--gradient">Bookify</h1>
          </a>
          {/* <Image src={Logo} alt="logo" width={160} height={40} className="" /> */}
        </div>
        <div
          className={`sidebar__wrapper ${
            pathName.startsWith("/player") && `audio__sidebar`
          }`}
        >
          <div className="sidebar__top">
            {NAV_LINKS.slice(0, 4).map(({ href, icon, text, disabled }, i) => (
              <NavLink key={i} {...{ href, icon, text, disabled }} />
            ))}
            {pathName.startsWith("/player") && <NavFontSizeChanger />}
          </div>

          <div className="nav__bot">
            {NAV_LINKS.slice(4, 6).map(({ href, icon, text, disabled }, i) => (
              <NavLink key={i} {...{ href, icon, text, disabled }} />
            ))}
            {isAuth ? (
              <div
                className="sidebar__link--wrapper "
                onClick={() => handleSignOut()}
              >
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
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
