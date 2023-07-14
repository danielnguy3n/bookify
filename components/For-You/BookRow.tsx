"use client";

import { Book } from "@/typings";
import BookCard from "./BookCard";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setPremium } from "@/redux/userSlice";

interface Props {
  data: Book[];
}

function BookRow({ data }: Props) {
  // const rowRef = useRef<HTMLDivElement>(null);
  // const slider = rowRef.current
  // const [isDown, setIsDown] = useState(false)
  // const [startX, setStartX] = useState(0)
  // const [scrollLeft, setScrollLeft] = useState(0)

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   setIsDown(true)
  //   setStartX(e.pageX - slider!.offsetLeft)
  //   setScrollLeft(slider!.scrollLeft)
  //   e.preventDefault()
  //   return false
  // };
  // const handleMouseUp = (e: React.MouseEvent) => {
  //   setIsDown(false)
  //   e.preventDefault()
  //   e.stopPropagation()
  // };
  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if(!isDown) return

  //   e.preventDefault()

  //   if (slider) {
  //     const x = e.pageX - slider.offsetLeft
  //     const walk = x - startX
  //     slider.scrollLeft = scrollLeft - walk
  //     console.log(startX)
  //   }

  // }

  const [user, setUser] = useState<User | null>();
  const dispatch = useAppDispatch()
  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
    });

    return authState;
  }, []);

  const premium = usePremiumStatus(auth.currentUser)
  
  return (
    <div
      // ref={rowRef}
      // onMouseDown={(event) => handleMouseDown(event)}
      // onMouseUp={(event) => handleMouseUp(event)}
      // onMouseMove={(event) => handleMouseMove(event)}
      // className={`for-you__recommended--books ${isDown && `active`}`}
      className={`for-you__recommended--books`}
    >
      {data.map((book) => (
        <BookCard key={book.id} {...{ book, premium }} />
      ))}
    </div>
  );
}

export default BookRow;
