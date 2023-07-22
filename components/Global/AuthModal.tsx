"use client";

import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import Google from "../../public/images/google.png";
import { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeModal } from "@/redux/modalSlice";
import {
  User,
  createUserWithEmailAndPassword,
  getIdToken,
  getIdTokenResult,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { setUser } from "@/redux/userSlice";
import { usePathname, useRouter } from "next/navigation";
import ForgotPassword from "./ForgotPassword";
import { setAuth } from "@/redux/authSlice";

function AuthModal() {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<string>("");
  const [modalType, setModalType] = useState<string>("signIn");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  async function setData(user: User) {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
    });

    await getIdToken(user, true);
    const decodedToken = await getIdTokenResult(user);

    dispatch(
      setUser({
        uid: user.uid,
        email: user.email,
        subscriptionPlan: decodedToken.claims.stripeRole || "Basic",
      })
    );

    dispatch(setAuth({ isAuth: true }));
  }

  function processLogin(user: User) {
    setData(user);
    dispatch(closeModal());
    if (pathname.endsWith("/")) {
      router.push("/for-you");
    }
  }

  async function handleSignUp() {
    try {
      setLoading("form");
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      processLogin(user);
    } catch (err: any) {
      setError(err.message);
      setLoading("");
    }
  }

  async function handleSignIn() {
    try {
      setLoading("form");
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      processLogin(user);
    } catch (err: any) {
      setError(err.message);
      setLoading("");
    }
  }

  async function guestSignIn() {
    setLoading("guest");
    const { user } = await signInWithEmailAndPassword(
      auth,
      "guest@gmail.com",
      "guest123"
    );
    processLogin(user);
  }

  async function signInWithGoogle() {
    try {
      setLoading("google");
      const { user } = await signInWithPopup(auth, provider);
      processLogin(user);
    } catch (err: any) {
      setError(err.message);
      setLoading("");
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    modalType === "signIn" ? handleSignIn() : handleSignUp();
  }

  function setModal(modalType: string) {
    setModalType(modalType);
    setError("");
  }

  return (
    <div className="modal__wrapper" onClick={() => dispatch(closeModal())}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">
          {modalType === "signIn" && (
            <>
              <div className="modal__title">Login to Summarist</div>
              {error && <div className="modal__error">{error}</div>}
              <button
                className="btn btn__login--guest"
                onClick={guestSignIn}
                disabled={loading === "guest"}
              >
                <figure className="btn__icon">
                  <BsFillPersonFill />
                </figure>
                <div className="btn__text">
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
              <button
                className="btn btn__login--google"
                onClick={signInWithGoogle}
                disabled={loading === "google"}
              >
                <div className="btn__icon btn__icon--google">
                  <Image src={Google} alt="google" width={24} height={24} />
                </div>
                <div className="btn__text">
                  {loading === "google" ? (
                    <ImSpinner8 className="login__spinner" />
                  ) : (
                    "Login with Google"
                  )}
                </div>
              </button>
            </>
          )}

          {modalType === "signUp" && (
            <>
              <div className="modal__title">Sign up Summarist</div>
              {error && <div className="modal__error">{error}</div>}
              <button
                className="btn btn__login--google"
                onClick={signInWithGoogle}
                disabled={loading === "google"}
              >
                <div className="btn__icon btn__icon--google">
                  <Image src={Google} alt="google" width={24} height={24} />
                </div>
                <div className="btn__text">
                  {loading === "google" ? (
                    <ImSpinner8 className="login__spinner" />
                  ) : (
                    "Sign Up with Google"
                  )}
                </div>
              </button>
            </>
          )}

          {modalType !== "forgotPassword" && (
            <>
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

                <button
                  type="submit"
                  className="btn"
                  disabled={loading === "form"}
                >
                  {loading === "form" ? (
                    <ImSpinner8 className="login__spinner black--spinner" />
                  ) : (
                    <> {modalType === "signIn" ? "Login" : "Sign Up"} </>
                  )}
                </button>
              </form>
            </>
          )}
          {modalType === "forgotPassword" && <ForgotPassword />}
        </div>

        {modalType !== "forgotPassword" && (
          <div
            className="modal__forgot-password"
            onClick={() => setModal("forgotPassword")}
          >
            Forgot your password?
          </div>
        )}

        {modalType === "signIn" && (
          <button className="modal__account" onClick={() => setModal("signUp")}>
            {`Don't Have an Account?`}
          </button>
        )}

        {modalType === "signUp" && (
          <button className="modal__account" onClick={() => setModal("signIn")}>
            {`Already have an account?`}
          </button>
        )}

        {modalType === "forgotPassword" && (
          <button className="modal__account" onClick={() => setModal("signIn")}>
            {`Go to Login`}
          </button>
        )}

        <div className="modal__close" onClick={() => dispatch(closeModal())}>
          <IoMdClose />
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
