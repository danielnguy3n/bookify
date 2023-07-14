"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import LoginImg from "../../../public/images/login.png";
import { openModal } from "@/redux/modalSlice";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import Link from "next/link";

function Settings() {
  const [user, setUser] = useState<User | null>();
  const dispatch = useAppDispatch();
  const premiumStatus = usePremiumStatus(auth.currentUser);
  console.log(premiumStatus)

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
    });

    return authState;
  }, []);

  return (
    <div className="row">
      <div className="container">
        <div className="settings__title">Settings</div>
        {user ? (
          <>
            <div className="settings__content">
              <div className="settings__subtitle">Your Subscription Plan</div>
              <div className="settings__desc">{premiumStatus}</div>
              {premiumStatus === "Basic" && (
                <Link href={`/choose-plan`}>
                  <button className="btn settings__btn">
                    Upgrade to Premium
                  </button>
                </Link>
              )}
            </div>
            <div className="settings__content">
              <div className="settings__subtitle">Email</div>
              <div className="settings__desc">{user.email}</div>
            </div>
          </>
        ) : (
          <>
            <div className="settings__login">
              <figure className="settings__img--wrapper">
                <Image src={LoginImg} alt="login" className="settings__img" />
              </figure>
              <div className="settings__login--title">
                Login to your account to see your details.
              </div>
              <button
                className="btn settings__login--btn"
                onClick={() => dispatch(openModal())}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Settings;
