import BookRowSkeleton from "./BookRowSkeleton";
import Skeleton from "./Skeleton";

function LibrarySkeleton() {
  return (
    <>
      <div className="library__title">Saved Books</div>
      <Skeleton width={60} height={20} />
      <div className="library__row">
        <BookRowSkeleton />
      </div>
      <div className="library__title">Finished</div>
      <Skeleton width={60} height={20} />
      <div className="library__row">
        <BookRowSkeleton />
      </div>
    </>
  );
}

export default LibrarySkeleton;
