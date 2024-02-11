import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as latestBooksService from "../../utils/topBooksService.js";
import * as booksService from "../../utils/booksService";
import './FamousBooks.scss'
import { ReadMore } from "../otherPages/ReadMoreINfo.jsx";

export function FamousBooks() {
  const [books, setBooks] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    latestBooksService.top()
      .then(result => {
        setBooks(result)
      })
      .catch(error => console.error(error))
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
    <section className="food_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <img src="./static/images/storytelling (1).png" alt="" />
          <h2>Последните 3 публикувани книги</h2>
        </div>
        <div className="food_container">
          {books.length <= 3 && (
            <>
              {books.slice(0, 3).map(book => (
                <div className="box" key={book._id}>
                  <div className="img-box">
                    <img src={book.imageUrl} alt="" />
                  </div>
                  <div className="detail-box">
                    <h3>
                      <p>{book.title}</p>
                      <h6>{book.author}</h6>
                    </h3>
                    <Link onClick={() => openInfo(book)}>Прочети още</Link>
                  </div>
                </div>
              ))}
            </>
          )}
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