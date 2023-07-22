"use client";

import { Book } from "@/typings";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { DocumentData } from "firebase/firestore";
import fetchPremiumStatus from "@/stripe/fetchPremiumStatus";
import { useAppSelector } from "@/redux/store";

interface Props {
  data: Book[] | DocumentData[];
}

function BookRow({ data }: Props) {
  const premium = useAppSelector(state => state.user.subscriptionPlan)

  return (
    <div className="for-you__recommended--books">
      {data.map((book) => (
        <BookCard key={book.id} {...{ book, premium }} />
      ))}
    </div>
  );
}

export default BookRow;
