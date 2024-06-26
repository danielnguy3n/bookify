"use client";

import BookPageSkeleton from "@/components/UI/BookPageSkeleton";
import { db } from "@/firebase";
import useAudioDuration from "@/hooks/useAudioDuration";
import { openModal } from "@/redux/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Book } from "@/typings";
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

function BookPage({ params }: { params: { id: string } }) {
  const uid = useAppSelector((state) => state.user.uid);
  const userSubscription = useAppSelector((state) => state.user.subscriptionPlan);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const bookId: string = params.id;
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [myLibrary, setMyLibrary] = useState<DocumentData[]>();
  const [addedToList, setAddedToList] = useState<Boolean>(false);

  const displayPremiumStatus =
  (userSubscription === "Basic" || !userSubscription) && book?.subscriptionRequired;

  async function fetchBook() {
    const data = await getBook(bookId);
    setBook(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchBook();
  }, []);

  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement>(null);
  const { bookDuration, onLoadedData } = useAudioDuration(audioRef);

  async function handleList() {
    if (addedToList) {
      await deleteDoc(doc(db, "users", uid, "myLibrary", book!.id));
    } else {
      await setDoc(doc(db, "users", uid, "myLibrary", book!.id), {
        ...book,
      });
    }
  }

  useEffect(() => {
    function checkList() {
      if (myLibrary) {
        setAddedToList(
          myLibrary.findIndex((result) => result.data().id === book?.id) !== -1
        );
      }
    }
    checkList();
  }, [myLibrary, book]);

  useEffect(() => {
    async function fetchList() {
      if (isAuth) {
        onSnapshot(collection(db, "users", uid, "myLibrary"), (snapshot) => {
          setMyLibrary(snapshot.docs);
        });
      }
    }
    fetchList();
  }, [uid]);

  if (loading) return <BookPageSkeleton />;

  return (
    <div className="row">
      <>
        <audio
          src={book?.audioLink}
          ref={audioRef}
          onLoadedMetadata={onLoadedData}
        ></audio>
        <div className="container">
          <div className="inner__wrapper">
            <div className="inner__book">
              <div className="book-info__title">
                {book?.title}
                {displayPremiumStatus && " (Premium)"}
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
                    <div className="book-info__detail--text">{book?.type}</div>
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
                {isAuth ? (
                  <>
                    <Link
                      href={
                        displayPremiumStatus ? `/choose-plan` : `/player/${bookId}`
                      }
                    >
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
              {isAuth ? (
                <>
                  <div
                    className="book-info__bookmark"
                    onClick={() => handleList()}
                  >
                    {addedToList ? (
                      <>
                        <div className="bookmark__icon">
                          <BsFillBookmarkFill />
                        </div>
                        <div className="bookmark__text">
                          Saved in My Library
                        </div>
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
                </>
              ) : (
                <div
                  className="book-info__bookmark"
                  onClick={() => dispatch(openModal())}
                >
                  <div className="bookmark__icon">
                    <BsBookmark />
                  </div>
                  <div className="bookmark__text">Add Title to My Library</div>
                </div>
              )}

              <div className="book-info__secondary-title">
                {`What's It About?`}
              </div>
              <div className="book-info__tags-wrapper">
                <div className="book-info__tag">{book?.tags[0]}</div>
                <div className="book-info__tag">{book?.tags[1]}</div>
              </div>
              <div className="book-info__description">
                {book?.bookDescription}
              </div>
              <div className="book-info__secondary-title">About the Author</div>
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
    </div>
  );
}

export default BookPage;
