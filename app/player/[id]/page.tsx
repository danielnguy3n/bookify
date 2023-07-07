import { Book } from "@/typings";

async function getBook(id: string) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  );
  return res.json();
}

async function Player({ params }: { params: { id: string } }) {
  const bookId: string = params.id;
  const book: Book = await getBook(bookId);
  return (
    <div className="summary">
        <div className="audio__book--summary">
            <div className="audio__book--summary-title">
                <b>{book.title}</b>
            </div>
            <div className="audio__book--summary-text">
                {book.summary}
            </div>
        </div>
        <div className="audio__wrapper">
            Player
        </div>
    </div>
  );
}

export default Player;
