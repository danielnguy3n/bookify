"use client";

import { Book } from "@/typings";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import AudioPlayer from "@/components/Player/AudioPlayer";

async function getBook(id: string) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  );

  return res.json();
}

function Player({ params }: { params: { id: string } }) {
  const bookId: string = params.id;
  const [book, setBook] = useState<Book>();

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
      <AudioPlayer book={book} />
    </div>
  );
}

export default Player;
