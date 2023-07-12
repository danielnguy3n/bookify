"use client";

import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import Google from "../../public/images/google.png";
import { useEffect, useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal } from "@/redux/modalSlice";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/firebase";
import { setUser } from "@/redux/userSlice";

function AuthModal() {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();

  async function handleSignUp() {
    try {
      setLoading("form");
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(closeModal());
    } catch (err: any) {
      setError(err.message);
      setLoading("");
    }
  }

  async function handleSignIn() {
    try {
      setLoading("form");
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(closeModal());
    } catch (err: any) {
      setError(err.message);
      setLoading("");
    }
  }

  async function guestSignIn() {
    setLoading("guest");
    await signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
    dispatch(closeModal());
  }

  async function signInWithGoogle() {
    try {
      setLoading("google");
      const signIn = await signInWithPopup(auth, provider);
      dispatch(closeModal());
    } catch (err: any) {
      setError(err.message);
      setLoading("");
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn ? handleSignIn() : handleSignUp();
  }

  function toggleModal() {
    setSignIn(!signIn);
    setError("");
  }

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      if (!currentUser) return;
      dispatch(
        setUser({
          email: currentUser.email,
        })
      );
    });

    return authState;
  }, [userEmail]);

  return (
    <div className="modal__wrapper" onClick={() => dispatch(closeModal())}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">
          {signIn ? (
            <>
              <div className="modal__title">Login to Summarist</div>
              {error && <div className="modal__error">{error}</div>}
              <button className="btn btn__login--guest">
                <figure className="btn__icon">
                  <BsFillPersonFill />
                </figure>
                <div className="btn__text" onClick={guestSignIn}>
                  {loading === "guest" ? (
                    <ImSpinner8 className="login__spinner" />
                  ) : (
                    "Login as a Guest"
                  )}
                </div>
              </button>
              <div className="modal__separator">
                <div className="modal__separator--text">or</div>
              </div>
              <button className="btn btn__login--google">
                <div className="btn__icon btn__icon--google">
                  <Image src={Google} alt="google" width={24} height={24} />
                </div>
                <div className="btn__text" onClick={signInWithGoogle}>
                  {loading === "google" ? (
                    <ImSpinner8 className="login__spinner" />
                  ) : (
                    "Login with Google"
                  )}
                </div>
              </button>
            </>
          ) : (
            <>
              <div className="modal__title">Sign up Summarist</div>
              {error && <div className="modal__error">{error}</div>}
              <button className="btn btn__login--google">
                <div className="btn__icon btn__icon--google">
                  <Image src={Google} alt="google" width={24} height={24} />
                </div>
                <div className="btn__text" onClick={signInWithGoogle}>
                  {loading === "google" ? (
                    <ImSpinner8 className="login__spinner" />
                  ) : (
                    "Sign Up with Google"
                  )}
                </div>
              </button>
            </>
          )}

          <div className="modal__separator">
            <span>or</span>
          </div>
          <form onSubmit={handleSubmit} className="login__form">
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
              <button type="submit" className="btn">
                {loading === "form" ? (
                  <ImSpinner8 className="login__spinner black--spinner" />
                ) : (
                  "Login"
                )}
              </button>
            ) : (
              <button type="submit" className="btn">
                {loading === "form" ? (
                  <ImSpinner8 className="login__spinner black--spinner" />
                ) : (
                  "Sign Up"
                )}
              </button>
            )}
          </form>
        </div>
        <div className="modal__forgot-password">Forgot your password?</div>

        <button className="modal__account" onClick={() => toggleModal()}>
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
