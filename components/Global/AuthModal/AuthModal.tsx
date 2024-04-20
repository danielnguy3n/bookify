"use client";

import {
  useState,
  FormEvent,
  MouseEventHandler,
  FormEventHandler,
  SetStateAction,
  Dispatch,
  createContext,
} from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/store";
import { auth, db, provider } from "@/firebase";
import {
  User,
  createUserWithEmailAndPassword,
  getIdToken,
  getIdTokenResult,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { IoMdClose as CloseIcon } from "react-icons/io";

import { closeModal } from "@/redux/modalSlice";
import { setUser } from "@/redux/userSlice";
import { setAuth } from "@/redux/authSlice";

import ModalContent from "./ModalContent";

interface AuthModalContextProps {
  error: string
  loading: string
  modalType: string
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setModal: Function
  guestSignIn:  MouseEventHandler<HTMLButtonElement>
  signInWithGoogle:  MouseEventHandler<HTMLButtonElement>
  handleSubmit: FormEventHandler<HTMLFormElement>
}

export const AuthModelContext = createContext<AuthModalContextProps>({
  error: "",
  loading: "",
  modalType: "",
  setEmail: () => {},
  setPassword: () => {},
  setModal: () => {},
  guestSignIn: () => {},
  signInWithGoogle: () => {},
  handleSubmit: () => {}
});

function AuthModal() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<string>("");
  const [modalType, setModalType] = useState<string>("signIn");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  async function assignUserToDatabaseAndStore(user: User) {
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
    assignUserToDatabaseAndStore(user);
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


  const contextProps = {
    error,
    loading,
    modalType,
    setEmail,
    setPassword,
    setModal,
    guestSignIn,
    signInWithGoogle,
    handleSubmit,
  }

  return (
    <AuthModelContext.Provider value={contextProps}>
      <div className="modal__wrapper" onClick={() => dispatch(closeModal())}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal__content">
            <ModalContent />
          </div>
          <div className="modal__close" onClick={() => dispatch(closeModal())}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </AuthModelContext.Provider>
  );
}

export default AuthModal;
