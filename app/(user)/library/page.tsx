'use client'

import { useAppDispatch, useAppSelector } from "@/redux/store";
import LoginImg from "../../../public/images/login.png";
import Image from "next/image";
import { openModal } from "@/redux/modalSlice";

function Library() {
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();

  return (
    <div className="row">
      <div className="container">
        {userEmail ? (
          <>
            <div className="library__title">Saved Books</div>
            <div className="library__subtitle">0 items</div>
            <div className="library__empty-row">
              <div className="empty__title">Save your favourite books!</div>
              <div className="empty__description">
                When you save a book, it will appear here
              </div>
            </div>
            <div className="library__title">Finished</div>
            <div className="library__subtitle">0 items</div>
            <div className="library__empty-row">
              <div className="empty__title">Done and dusted!</div>
              <div className="empty__description">
                When you finish a book, you can find it here later.
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="settings__login">
              <figure className="settings__img--wrapper">
                <Image src={LoginImg} alt="login" className="settings__img" />
              </figure>
              <div className="settings__login--title">
                Login to your account to see your library.
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
      </div>
    </div>
  );
}

export default Library;
