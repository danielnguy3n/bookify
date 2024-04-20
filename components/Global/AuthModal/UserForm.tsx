import Button from '@/components/UI/Button';
import React, { Dispatch, FormEventHandler, SetStateAction, useContext } from 'react'
import { AuthModelContext } from "./AuthModal";

export interface UserFormProps {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    loading: string;
    modalType: string;
  }
  
export const UserForm = () => {
    const { handleSubmit, setEmail, setPassword, loading, modalType } = useContext(AuthModelContext)
    return (
      <form onSubmit={handleSubmit} className="login__form">
        <input
          type="text"
          name="email"
          className="login__input"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="login__input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
  
        <Button
          type="submit"
          disabled={loading === "form"}
          loading={loading === "form"}
        >
          {modalType === "signIn" ? "Login" : "Sign Up"}
        </Button>
      </form>
    );
  };