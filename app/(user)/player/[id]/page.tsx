"use client";

import { Book } from "@/typings";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useState, useEffect } from "react";
import AudioPlayer from "@/components/Player/AudioPlayer";
import { ImSpinner8 } from "react-icons/im";
import Image from "next/image";
import LoginImg from "@/public/images/login.png";
import { openModal } from "@/redux/modalSlice";

async function getBook(id: string) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  );

  return res.json();
}

function Player({ params }: { params: { id: string } }) {
  const bookId: string = params.id;
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<Boolean>(true);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  async function fetchBook() {
    const data = await getBook(bookId);
    setBook(data);
  }

  useEffect(() => {
    fetchBook();
  }, []);

  const fontSize = useSelector((state: RootState) => state.fontSize.fontSize);

  return (
    <>
      <div className="summary">
        {loading ? (
          <>
            <div className="spinner--wrapper player">
              <ImSpinner8 className="plan--spinner player--spinner" />
            </div>
          </>
        ) : (
          <>
            {isAuth ? (
              <>
                <div className="audio__book--summary">
                  <div className="audio__book--summary-title">
                    <b>{book?.title}</b>
                  </div>
                  <div
                    className="audio__book--summary-text"
                    style={{ fontSize: fontSize }}
                  >
                    {book?.summary}
                  </div>
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
                    Login to your account to read and listen to the book.
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
        <AudioPlayer {...{ book, setLoading, loading }} />
      </div>
    </>
  );
}

export default Player;
