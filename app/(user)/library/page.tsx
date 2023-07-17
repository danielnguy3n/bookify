"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import LoginImg from "../../../public/images/login.png";
import Image from "next/image";
import { openModal } from "@/redux/modalSlice";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import LibrarySkeleton from "@/components/UI/LibrarySkeleton";
import { Book } from "@/typings";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import BookRow from "@/components/For-You/BookRow";

function Library() {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>();
  const [myLibrary, setMyLibrary] = useState<Book[] | DocumentData[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    return authState;
  }, []);

  function fetchList() {
    if (user) {
      onSnapshot(collection(db, "users", user.uid, "myLibrary"), (snapshot) => {
        setMyLibrary(snapshot.docs.map((book) => book.data()));
      });
    }
  }

  useEffect(() => {
    fetchList();
  }, [db, user]);

  return (
    <div className="row">
      <div className="container">
        {loading ? (
          <LibrarySkeleton />
        ) : (
          <>
            {user ? (
              <>
                <div className="library__title">Saved Books</div>
                {myLibrary ? (
                  <>
                    <div className="library__subtitle">
                      {myLibrary.length} items
                    </div>
                    <BookRow data={myLibrary} />
                  </>
                ) : (
                  <>
                    <div className="library__subtitle">0 items</div>
                    <div className="library__empty-row">
                      <div className="empty__title">
                        Save your favourite books!
                      </div>
                      <div className="empty__description">
                        When you save a book, it will appear here
                      </div>
                    </div>
                  </>
                )}
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
                    <Image
                      src={LoginImg}
                      alt="login"
                      className="settings__img"
                    />
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
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default Library;
