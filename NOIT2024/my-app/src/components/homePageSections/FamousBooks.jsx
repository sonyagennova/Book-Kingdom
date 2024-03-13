import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as latestBooksService from "../../utils/topBooksService.js";
// import * as booksService from "../../utils/booksService";
import './FamousBooks.scss'
import { ReadMore } from "../otherPages/ReadMoreINfo.jsx";

export function FamousBooks() {
  const [books, setBooks] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    latestBooksService.top()
      .then(result => {
        setBooks(result)
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [])

  const openInfo = (book) => {
    setSelectedBook(book);
    setShowInfo(true);
  }

  const bookInfoCloseHandler = () => {
    setShowInfo(false);
    setSelectedBook(null);
  }

  return (
    <section className="book_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <img src="./static/images/storytelling (1).png" alt="" />
          <h2>Последно публикувани книги</h2>
        </div>
        <div className="book_container">
        {loading ? ( // Показва спинър, докато информацията се зарежда
         <div className="spinner-border" role="status">
         <span class="loader"></span>
        </div>
        ) : ( <>
          {books.length <= 3 && (
            <>
              {books.slice(0, 3).map(book => (
                <div className="book-box" key={book._id}>
                  <img src={book.imageUrl} alt="" />
                  <div className="details-box">
                    <h3>{book.title}</h3>
                      <h6>{book.author}</h6>
                    <Link onClick={() => openInfo(book)}>Прочети още</Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </>)}
        </div>
      </div>
      {selectedBook && (
        <ReadMore
          bookId={selectedBook._id}
          infoClose={bookInfoCloseHandler}
          show={showInfo}
          setShowInfo={setShowInfo}
        />
      )}
    </section>
  );
}