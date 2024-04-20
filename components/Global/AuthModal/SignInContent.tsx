
import Image from "next/image";
import React, { useContext } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import Google from "../../../public/images/google.png";

import Button from "@/components/UI/Button";
import ModalDivider from "@/components/UI/ModalDivider";

import { UserForm } from "./UserForm";
import { AuthModelContext } from "./AuthModal";

export const SignInContent = () => {
  const { error, guestSignIn, signInWithGoogle, loading, setModal } =
    useContext(AuthModelContext);
  return (
    <>
      <div className="modal__title">Login to Bookify</div>
      {error && <div className="modal__error">{error}</div>}

      <Button
        icon={
          <figure className="btn__icon">
            <BsFillPersonFill />
          </figure>
        }
        additionalClassName="btn__login--guest"
        onClick={guestSignIn}
        disabled={loading === "guest"}
        loading={loading === "guest"}
      >
        Login as a Guest
      </Button>
      <ModalDivider />
      <Button
        icon={
          <div className="btn__icon btn__icon--google">
            <Image src={Google} alt="google" width={24} height={24} />
          </div>
        }
        additionalClassName="btn__login--google"
        onClick={signInWithGoogle}
        disabled={loading === "google"}
        loading={loading === "google"}
      >
        Login with Google
      </Button>
      <ModalDivider />
      <UserForm />
      <div
        className="modal__forgot-password"
        onClick={() => setModal("forgotPassword")}
      >
        Forgot your password?
      </div>
      <button className="modal__account" onClick={() => setModal("signUp")}>
        {`Don't Have an Account?`}
      </button>

    </>
  );
};
