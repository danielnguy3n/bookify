"use client";

import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Google from "../../public/images/google.png";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal } from "@/redux/modalSlice";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";

function AuthModal() {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  async function handleSignUp() {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(closeModal())
  }

  useEffect(() => {
    const userVar = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          email: currentUser.email,
        })
      );
      console.log(currentUser);
      // handle redux actions
    });

    return userVar;
  }, []);

  return (
    <div className="modal__wrapper" onClick={() => dispatch(closeModal())}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">
          {signIn ? (
            <>
              <div className="modal__title">Login to Summarist</div>
              <button className="btn btn__login--guest">
                <figure className="btn__icon">
                  <BsFillPersonFill />
                </figure>
                <div className="btn__text">Login as a Guest</div>
              </button>
              <div className="modal__separator">
                <div className="modal__separator--text">or</div>
              </div>
              <button className="btn btn__login--google">
                <div className="btn__icon btn__icon--google">
                  <Image src={Google} alt="google" width={24} height={24} />
                </div>
                <div className="btn__text">Login with Google</div>
              </button>
            </>
          ) : (
            <>
              <div className="modal__title">Sign up Summarist</div>
              <button className="btn btn__login--google">
                <div className="btn__icon btn__icon--google">
                  <Image src={Google} alt="google" width={24} height={24} />
                </div>
                <div className="btn__text">Sign Up With Google</div>
              </button>
            </>
          )}

          <div className="modal__separator">
            <span>or</span>
          </div>
          <div className="login__form">
            <input
              type="text"
              className="login__input"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="login__input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {signIn ? (
              <button className="btn" onClick={handleSignIn}>
                Login
              </button>
            ) : (
              <button className="btn" onClick={handleSignUp}>
                Sign Up
              </button>
            )}
          </div>
        </div>
        <div className="modal__forgot-password">Forgot your password?</div>

        <button className="modal__account" onClick={() => setSignIn(!signIn)}>
          {signIn ? `Don't have an account?` : `Already have an account?`}
        </button>
        <div className="modal__close" onClick={() => dispatch(closeModal())}>
          <IoMdClose />
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
