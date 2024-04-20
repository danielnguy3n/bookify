import BookRow from "@/components/For-You/BookRow";
import SelectedBook from "@/components/For-You/SelectedBook";

async function getBooks(status: string) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`
  );
  return res.json();
}

export default async function ForYou() {
  const selectedData = getBooks("selected");
  const recommendedData = getBooks("recommended");
  const suggestedData = getBooks("suggested");

  const [selectedBook, recommendedBooks, suggestedBooks] = await Promise.all([
    selectedData,
    recommendedData,
    suggestedData,
  ]);

  
  return (
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <div className="for-you__title">Selected Just For you</div>
          <SelectedBook book={selectedBook[0]} />

          <div className="for-you__title">Recommended For You</div>
          <div className="for-you__subtitle">We think you’ll like these</div>
          <BookRow data={recommendedBooks} />
          

          <div className="for-you__title">Suggested Books</div>
          <div className="for-you__subtitle">Browse those books</div>
          <BookRow data={suggestedBooks} />
        </div>
      </div>
    </div>
  );
}
