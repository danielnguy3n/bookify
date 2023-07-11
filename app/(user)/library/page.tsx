
function Library() {
  return (
    <div className="row">
        <div className="container">
            <div className="library__title">Saved Books</div>
            <div className="library__subtitle">0 items</div>
            <div className="library__empty-row">
                <div className="empty__title">Save your favourite books!</div>
                <div className="empty__description">When you save a book, it will appear here</div>
            </div>
            <div className="library__title">Finished</div>
            <div className="library__subtitle">0 items</div>
            <div className="library__empty-row">
                <div className="empty__title">Done and dusted!</div>
                <div className="empty__description">When you finish a book, you can find it here later.</div>
            </div>
        </div>
    </div>
  )
}

export default Library