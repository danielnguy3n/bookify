"use client";

import { useAppDispatch } from "@/redux/store";
import Image from "next/image";
import LoginImg from "../../../public/images/login.png";
import { openModal } from "@/redux/modalSlice";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import { ImSpinner8 } from "react-icons/im";
import Skeleton from "@/components/UI/Skeleton";
import fetchPremiumStatus from "@/stripe/fetchPremiumStatus";

function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingSpinner, setLoadingSpinner] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const dispatch = useAppDispatch();
  const [premium, setPremium] = useState<string | null>(null)

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    return authState;
  }, []);

  async function premiumStatus() {
    const premium = await fetchPremiumStatus()
    setPremium(premium)
  }

  useEffect(() => {
    premiumStatus()
  }, [user])

  return (
    <div className="row">
      <div className="container">
        <div className="settings__title">Settings</div>
        { loading ? 
          <>
            <Skeleton width={160} height={24} marginBottom={12} />
            <Skeleton width={280} height={24} marginBottom={12} />
            <br />
            <Skeleton width={160} height={24} marginBottom={12} />
            <Skeleton width={280} height={24} marginBottom={12} />
          </> : <>
          {user ? (
          <>
            <div className="settings__content">
              <div className="settings__subtitle">Your Subscription Plan</div>
              <div className="settings__desc">{premium}</div>
              {premium === "Basic" && (
                <Link href={`/choose-plan`}>
                  <button
                    className="btn settings__btn"
                    onClick={() => setLoadingSpinner(true)}
                    disabled={!!loadingSpinner}
                  >
                    {loadingSpinner ? (
                      <ImSpinner8 className="login__spinner" />
                    ) : (
                      "Upgrade to Premium"
                    )}
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
          </>
        }
        
      </div>
    </div>
  );
}

export default Settings;
