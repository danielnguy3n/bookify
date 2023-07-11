"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import LoginImg from "../../../public/images/login.png";
import { openModal } from "@/redux/modalSlice";

function Settings() {
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch()

  return (
    <div className="row">
      <div className="container">
        <div className="settings__title">Settings</div>
        {userEmail ? (
          <>
            <div className="settings__content">
              <div className="settings__subtitle">Your Subscription Plan</div>
              <div className="settings__desc">Basic</div>
              <button className="btn settings__btn">Upgrade to Premium</button>
            </div>
            <div className="settings__content">
              <div className="settings__subtitle">Email</div>
              <div className="settings__desc">{userEmail}</div>
            </div>
          </>
        ) : (
          <>
            <div className="settings__login">
              <figure className="settings__img--wrapper">
                <Image src={LoginImg} alt="login"  className="settings__img"/>
              </figure>
              <div className="settings__login--title">Login to your account to see your details.</div>
              <button className="btn settings__login--btn" onClick={() => dispatch(openModal())}>Login</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Settings;
