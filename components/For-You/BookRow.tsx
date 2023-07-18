"use client";

import { Book } from "@/typings";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { DocumentData } from "firebase/firestore";
import fetchPremiumStatus from "@/stripe/fetchPremiumStatus";

interface Props {
  data: Book[] | DocumentData[];
}

function BookRow({ data }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [premium, setPremium] = useState<string | null>(null)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null)
      } else {
        setUser(user)
      }
    })
  }, [])

  async function premiumStatus() {
    const premium = await fetchPremiumStatus()
    setPremium(premium)
  }

  useEffect(() => {
    premiumStatus()
  }, [user])

  return (
    <div className="for-you__recommended--books">
      {data.map((book) => (
        <BookCard key={book.id} {...{ book, premium }} />
      ))}
    </div>
  );
}

export default BookRow;
