"use client";

import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="modal__title">Reset your password</div>
      {success && (
        <div className="modal__success">Your reset email has been sent!</div>
      )}
      {error && <div className="modal__error">{error}</div>}
      <form onSubmit={(e) => handleSubmit(e)} className="login__form">
        <input
          type="text"
          className="login__input"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? (
            <ImSpinner8 className="login__spinner black--spinner" />
          ) : (
            "Send Reset Password Link"
          )}
        </button>
      </form>
    </>
  );
}

export default ForgotPassword;
