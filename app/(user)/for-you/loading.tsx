import BookRowSkeleton from "@/components/UI/BookRowSkeleton";
import Skeleton from "@/components/UI/Skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <div className="for-you__title">Selected Just For you</div>
          <Skeleton width={600} height={180} />

          <div className="for-you__title">Recommended For You</div>
          <div className="for-you__subtitle">We think you’ll like these</div>
          <BookRowSkeleton />

          <div className="for-you__title">Suggested Books</div>
          <div className="for-you__subtitle">Browse those books</div>
          <BookRowSkeleton />

        </div>
      </div>
    </div>
  );
}
