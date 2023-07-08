'use client'

import { Book } from "@/typings";
import { BiPlay } from "react-icons/bi";
import { GrBackTen, GrForwardTen } from "react-icons/gr";
import { useSelector } from 'react-redux'
import { RootState } from "@/redux/store";
import { useState } from "react";

async function getBook(id: string) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  );
  
  return res.json();
}

function Player({ params }: { params: { id: string } }) {
  const bookId: string = params.id;
  const [book, setBook] = useState<Book>()
  async function fetchBook() {
    const data = await getBook(bookId)
    setBook(data);
  }
  fetchBook()
  const fontSize = useSelector((state: RootState) => state.fontSize.fontSize)
  

  return (
    <div className="summary">
      <div className="audio__book--summary">
        <div className="audio__book--summary-title">
          <b>{book?.title}</b>
        </div>
        <div className="audio__book--summary-text" style={{fontSize: fontSize}}>{book?.summary}</div>
      </div>
      <div className="audio__wrapper">
        <div className="audio__track--wrapper">
          <figure className="audio__img--mask">
            <figure className="audio__img--wrapper">
              <img src={book?.imageLink} alt="" className="audio__img" />
            </figure>
          </figure>
          <div className="audio__text">
            <div className="audio__title">{book?.title}</div>
            <div className="audio__author">{book?.author}</div>
          </div>
        </div>
        <div className="audio__controls--wrapper">
          <div className="audio__controls">
            <button className="audio__controls--btn">
              <GrBackTen />
            </button>
            <button className="audio__controls--btn audio__controls--btn--play">
              <BiPlay />
            </button>
            <button className="audio__controls--btn">
              <GrForwardTen />
            </button>
          </div>
        </div>
        <div className="audio__progress--wrapper">
          <div className="audio__time">0:30</div>
          <input type="range" className="audio__progress--bar"/>
          <div className="audio__time">03:24</div>
        </div>
      </div>
    </div>
  );
}

export default Player;
