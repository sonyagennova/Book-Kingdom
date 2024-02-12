import { Footer } from "../homePageSections/Footer";
import { Info } from "../homePageSections/InfoSection";
import { Nav } from "../partial/Navbar";
import * as bookService from '../../utils/booksService';
import * as userService from '../../utils/userService';
import { Fragment, useContext, useEffect, useState } from "react";
import './CategoriesPage.scss'
import './CategoryPage.scss'
import './userProfile.scss'
import ReactPaginate from 'react-paginate';
import { ReadMore } from "./ReadMoreINfo";
import useLike from "../../hooks/useLike";
import { NavProfile } from "../partial/navProfilePage";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function UserProfilePage(){
    const [books3, setBooks] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bookData, setBookData] = useState([]);

  const{clicked, setLike} = useLike()

  const navigate = useNavigate()

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 24;

  useEffect(() => {
    async function getBooks() {
      try {
        const user = await userService.getOne(location.pathname.split("/")[1]);
        const books = await bookService.getAll();
  
        // Check if books is an array before using forEach
        if (Array.isArray(books)) {
          const userBooks = books.filter(book => book.ownerId === user._id);
          setBookData(userBooks);
        } else {
          console.error('Error: books is not an array');
        }
      } catch (error) {
        console.error('Error fetching user or books data:', error);
      }
    }
  
    getBooks();
  }, [location.pathname]);

  const startOffset = itemOffset;
    const endOffset = Math.min(startOffset + itemsPerPage, bookData.length);
    const currentItems = bookData.slice(startOffset, endOffset);
    const pageCount = Math.ceil(bookData.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % bookData.length;
      setItemOffset(newOffset);
    };

  const userId = location.pathname.split("/")[1];

  useEffect(() => {
    bookService.getAll()
      .then(result => setBooks(result))
      .then(() => setLike())
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  useEffect(() => {
    if (userId) {
      userService.getOne(userId)
        .then(result => {
          setUserImage(result.userImage);
          setUserName(result.name);
          setUserEmail(result.email);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [userId]);

  const openInfo = (book) => {
    setSelectedBook(book);
    setShowInfo(true);
  };

  const bookInfoCloseHandler = () => {
    setShowInfo(false);
    setSelectedBook(null);
  };

  const goToCategories = (e) => {
    e.preventDefault();
    navigate("/categories")
}

    return(
        <>
        <section className="animal_section1 back">
        <div className="container-fluid">
            <NavProfile/>
        </div>
        <div style={{marginLeft: "30px"}} className="d-flex justify-content-start">
                    <Button onClick={goToCategories} variant="light">
                        Всички категории
                    </Button>
                </div>
        <div className="profile-card">
  <div className="main-profile-area">
    <div className="img-container">
      <img
        src={userImage}
        alt=""
        className="user-img"
      />
    </div>
    <div className="wrapper">
      <div className="user-info">
        <section className="left-column">
          <h3 className="profile-names">{userName}</h3>
          <p className="label">Email</p>
          <p className="profile-data">{userEmail}</p>
          
          {/* <p className="label">Country</p>
          <p className="profile-data">Brazil</p>
          <p className="label">Role</p>
          <p className="profile-data">Booklover</p> */}
        </section>
      </div>
      <h3 className="profile-names">Създадени книги</h3>
      {bookData.length > 0 &&
        <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={8}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
      />
      }
      <div className="profile-tabs">
          {bookData.length > 0 ? (
    bookData.map((books) =>
        <div className=" flip-card">
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <img
        className="book-cover-img"
        src={books.imageUrl}
        alt=""
      />
    </div>
    <div className="flip-card-back">
      <div>
        <p className="author-flip-card-back">{books.author}</p>
        <h3>{books.title}</h3>
        <p className="cat">{books.category}</p>
        <button className="view-book" onClick={() => openInfo(books)}>Прочети още</button>
      </div>
    </div>
  </div>
</div>
      )
    ) : (
    <h3>Няма създадени книги.</h3>
  )}
      </div>
    </div>
  </div>
</div>
      
        {selectedBook && (
        <ReadMore
          bookId={selectedBook._id}
          infoClose={bookInfoCloseHandler}
          show={showInfo}
          setShowInfo={setShowInfo}
        />
      )}<br/>
        <Footer />
      </section>

      </>
    )
}