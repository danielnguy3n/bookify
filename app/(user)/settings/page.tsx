"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";
import LoginImg from "../../../public/images/login.png";
import { openModal } from "@/redux/modalSlice";
import { useState } from "react";
import Link from "next/link";
import { ImSpinner8 } from "react-icons/im";
import Skeleton from "@/components/UI/Skeleton";

function Settings() {
  const loading = useAppSelector((state) => state.auth.authLoading);
  const user = useAppSelector((state) => state.user);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [loadingSpinner, setLoadingSpinner] = useState<Boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <div className="row">
      <div className="container">
        <div className="settings__title">Settings</div>
        {loading ? (
          <>
            <Skeleton width={160} height={24} marginBottom={12} />
            <Skeleton width={280} height={24} marginBottom={12} />
            <br />
            <Skeleton width={160} height={24} marginBottom={12} />
            <Skeleton width={280} height={24} marginBottom={12} />
          </>
        ) : (
          <>
            {isAuth ? (
              <>
                <div className="settings__content">
                  <div className="settings__subtitle">
                    Your Subscription Plan
                  </div>
                  <div className="settings__desc">{user.subscriptionPlan}</div>
                  {user.subscriptionPlan === "Basic" && (
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
                    <Image
                      src={LoginImg}
                      alt="login"
                      className="settings__img"
                    />
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
        )}
      </div>
    </div>
  );
}

export default Settings;
