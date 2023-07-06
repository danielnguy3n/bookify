import { Book } from "@/typings"
import BookCard from "./BookCard"

interface Props {
  data: Book[]
}

function BookRow({data}: Props) {
  return (
    <div className="for-you__recommended--books">
      {data.map(book => 
        <BookCard key={book.id} book={book}/>
      )}
    </div>
  )
}

export default BookRow