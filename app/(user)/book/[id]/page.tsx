"use client";

import BookPageSkeleton from "@/components/UI/BookPageSkeleton";
import Skeleton from "@/components/UI/Skeleton";
import { auth, db } from "@/firebase";
import { openModal } from "@/redux/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { Book } from "@/typings";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AiOutlineAudio,
  AiOutlineClockCircle,
  AiOutlineStar,
} from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { HiOutlineBookOpen, HiOutlineLightBulb } from "react-icons/hi";

async function getBook(id: string) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  );
  return res.json();
}

function bookPage({ params }: { params: { id: string } }) {
  const bookId: string = params.id;
  const [book, setBook] = useState<Book>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [myLibrary, setMyLibrary] = useState<DocumentData[]>();
  const [addedToList, setAddedToList] = useState<Boolean>(false);

  const premiumStatus = usePremiumStatus(auth.currentUser);

  async function fetchBook() {
    const data = await getBook(bookId);
    setBook(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchBook();
    const authState = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      setUser(user);
    });
    return authState;
  }, []);

  const dispatch = useAppDispatch();

  const [bookDuration, setBookDuration] = useState<string>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const onLoadedMetaData = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);

      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const durationString = `${formatMinutes}:${formatSeconds}`;

      setBookDuration(durationString);
    }
  };

  async function handleList() {
    if (addedToList) {
      await deleteDoc(doc(db, "users", user!.uid, "myLibrary", book!.id));
    } else {
      await setDoc(doc(db, "users", user!.uid, "myLibrary", book!.id), {
        ...book,
      });
    }
  }

  async function fetchList() {
    if (user) {
      onSnapshot(collection(db, "users", user.uid, "myLibrary"), (snapshot) => {
        setMyLibrary(snapshot.docs);
      });
    }
  }

  function checkList() {
    if (myLibrary) {
      setAddedToList(myLibrary.findIndex((result) => result.data().id === book?.id) !== -1)
    }
  }

  useEffect(() => {
    checkList()
  }, [myLibrary, book])

  useEffect(() => {
    fetchList()
  }, [user, db])

  return (
    <div className="row">
      {loading ? (
        <BookPageSkeleton />
      ) : (
        <>
          <audio
            src={book?.audioLink}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetaData}
          ></audio>
          <div className="container">
            <div className="inner__wrapper">
              <div className="inner__book">
                <div className="book-info__title">
                  {book?.title}
                  {premiumStatus === "Basic" ||
                    (!premiumStatus && " (Premium)")}
                </div>
                <div className="book-info__author">{book?.author}</div>
                <div className="book-info__subtitle">{book?.subTitle}</div>
                <div className="book-info__details--wrapper">
                  <div className="book-info__details">
                    <div className="book-info__detail">
                      <div className="book-info__detail--icon">
                        <AiOutlineStar />
                      </div>
                      <div className="book-info__detail--text">
                        {book?.averageRating} ({book?.totalRating} ratings)
                      </div>
                    </div>
                    <div className="book-info__detail">
                      <div className="book-info__detail--icon">
                        <AiOutlineClockCircle />
                      </div>
                      <div className="book-info__detail--text">
                        {bookDuration}
                      </div>
                    </div>
                    <div className="book-info__detail">
                      <div className="book-info__detail--icon">
                        <AiOutlineAudio />
                      </div>
                      <div className="book-info__detail--text">
                        {book?.type}
                      </div>
                    </div>
                    <div className="book-info__detail">
                      <div className="book-info__detail--icon">
                        <HiOutlineLightBulb />
                      </div>
                      <div className="book-info__detail--text">
                        {book?.keyIdeas} Key Ideas
                      </div>
                    </div>
                  </div>
                </div>
                <div className="book-info__button-wrapper">
                  {user ? (
                    <>
                      <Link href={`/player/${bookId}`}>
                        <button className="book-info__button">
                          <div className="button__icon">
                            <HiOutlineBookOpen />
                          </div>
                          <div className="button__text">Read</div>
                        </button>
                      </Link>
                      <Link href={`/player/${bookId}`}>
                        <button className="book-info__button">
                          <div className="button__icon">
                            <AiOutlineAudio />
                          </div>
                          <div className="button__text">Listen</div>
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        className="book-info__button"
                        onClick={() => dispatch(openModal())}
                      >
                        <div className="button__icon">
                          <HiOutlineBookOpen />
                        </div>
                        <div className="button__text">Read</div>
                      </button>
                      <button
                        className="book-info__button"
                        onClick={() => dispatch(openModal())}
                      >
                        <div className="button__icon">
                          <AiOutlineAudio />
                        </div>
                        <div className="button__text">Listen</div>
                      </button>
                    </>
                  )}
                </div>
                <div
                  className="book-info__bookmark"
                  onClick={() => handleList()}
                >
                  {addedToList ? (
                    <>
                      <div className="bookmark__icon">
                        <BsFillBookmarkFill />
                      </div>
                      <div className="bookmark__text">Saved in My Library</div>
                    </>
                  ) : (
                    <>
                      <div className="bookmark__icon">
                        <BsBookmark />
                      </div>
                      <div className="bookmark__text">
                        Add Title to My Library
                      </div>
                    </>
                  )}
                </div>
                <div className="book-info__secondary-title">
                  What's It About?
                </div>
                <div className="book-info__tags-wrapper">
                  <div className="book-info__tag">{book?.tags[0]}</div>
                  <div className="book-info__tag">{book?.tags[1]}</div>
                </div>
                <div className="book-info__description">
                  {book?.bookDescription}
                </div>
                <div className="book-info__secondary-title">
                  About the Author
                </div>
                <div className="book-info__author-description">
                  {book?.authorDescription}
                </div>
              </div>

              <div className="inner-book__img--wrapper">
                <figure className="book-info__img--wrapper">
                  {book?.imageLink && (
                    <Image
                      src={book?.imageLink}
                      alt="Book Image"
                      width={300}
                      height={300}
                      className="book__img"
                    />
                  )}
                </figure>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default bookPage;
