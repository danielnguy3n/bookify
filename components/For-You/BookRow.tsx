"use client";

import BookCard from "./BookCard";

import { Book } from "@/typings";
import { DocumentData } from "firebase/firestore";

interface Props {
  data: Book[] | DocumentData[];
}

function BookRow({ data }: Props) {
  return (
    <div className="for-you__recommended--books">
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookRow;
