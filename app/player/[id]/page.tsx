"use client";

import { Book } from "@/typings";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import AudioPlayer from "@/components/Player/AudioPlayer";
import { ImSpinner8 } from "react-icons/im";

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

  async function fetchBook() {
    const data = await getBook(bookId);
    setBook(data);
  }

  useEffect(() => {
    fetchBook();
  }, []);

  const fontSize = useSelector((state: RootState) => state.fontSize.fontSize);

  return (
    <div className="summary">
      {loading ? (
        <>
          <div className="spinner--wrapper player">
            <ImSpinner8 className="plan--spinner player--spinner" />
          </div>
        </>
      ) : (
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
      )}
      <AudioPlayer {...{book, setLoading, loading}}/>
    </div>
  );
}

export default Player;
