import React, { useContext } from "react";
import Image from "next/image";

import Button from "@/components/UI/Button";
import ModalDivider from "@/components/UI/ModalDivider";

import { UserForm } from "./UserForm";
import { AuthModelContext } from "./AuthModal";

import Google from "../../../public/images/google.png";

export const SignUpContent = () => {
  const { error, signInWithGoogle, loading, setModal } =
    useContext(AuthModelContext);
  return (
    <>
      <div className="modal__title">Sign Up to Bookify</div>
      {error && <div className="modal__error">{error}</div>}
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
        Sign Up with Google
      </Button>
      <ModalDivider />
      <UserForm />

      <button className="modal__account" onClick={() => setModal("signIn")}>
        {`Already have an account?`}
      </button>
    </>
  );
};
