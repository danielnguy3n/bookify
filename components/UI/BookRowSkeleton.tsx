import Skeleton from "./Skeleton";

function BookRowSkeleton() {
  return (
    <div className="for-you__recommended--books">
      {Array(5)
        .fill(0)
        .map((_,index) => (
          <div className="book--wrapper" key={index}>
            <Skeleton width={200} height={240} marginBottom={8} />
            <Skeleton width={200} height={20} marginBottom={8} />
            <Skeleton width={180} height={15} marginBottom={8} />
            <Skeleton width={160} height={32} marginBottom={8} />
            <Skeleton width={180} height={15} />
          </div>
        ))}
    </div>
  );
}

export default BookRowSkeleton;
