import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import * as booksService from "../../utils/booksService";
import { Footer } from "../homePageSections/Footer";
import { BooksItem } from "../partial/BooksItem";
import { CapitalizeFirstLowercaseRest } from "../partial/FirstLetterCapitel";
import { Nav } from "../partial/Navbar";
import { ReadMore, selectedUser } from "./ReadMoreINfo";
import './CategoryPage.scss'
import { Button } from "react-bootstrap";
import { categorySort, categorySortPath } from "../../utils/category";
export let booksForCategory=[];
export function CategoryPage(){
    const [selectedBook, setSelectedBook] = useState([]);
    const [books, setBooks] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [comments, setComments] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [booksForCategory, setBooksForCategory] = useState([]);

    const [Lowercategory, setCategoryLower] = useState("");
    
    const itemsPerPage = 8
    let categoryBooks = [];
    let category = "";

    //console.log(location.pathname.split('/')[1])

    // const [userIds, setUserIds] = useState([]);
    // let ids = [];

    const navigate = useNavigate();

    const bookInfoClickHandler = (bookId, comments) => {
        setSelectedBook(bookId);
        setShowInfo(true);
        setComments(comments)
    };

    const goToCategories = (e) => {
        e.preventDefault();
        navigate("/categories")
    }
    category = CapitalizeFirstLowercaseRest(location.pathname.split('/')[2]);
    const newCategory = categorySort(category)
    category = newCategory
    console.log(category)

    useEffect(() => {
        booksService.getAll()
        .then(result => {
            setBooks(result)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      if (category) {
          setCategoryLower(category.toLowerCase());
      }
  }, [category]);

  useEffect(() => {
      const pathCategory = categorySortPath(Lowercategory);
      const filteredBooks = books.filter(book => book.category === Lowercategory);
      setBooksForCategory(filteredBooks);
  }, [books, Lowercategory]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = booksForCategory.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(booksForCategory.length / itemsPerPage);
    const pathCategory = categorySortPath(Lowercategory);

    books.forEach(book => {
        if(book.category == Lowercategory){
            booksForCategory.push(book);
        }
    })

  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % booksForCategory.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);}

    
    const bookInfoCloseHandler = () => {
        setShowInfo(false);
        booksService.getAll()
        .then(result => setBooks(result))
        .catch(err => console.log(err));
        console.log(pathCategory)
        navigate(`/category/${pathCategory}`, {state: books})
    }
    let ifBook = false;
    let categoryBook = [];

        books.forEach(book => {
            if(location.pathname.includes(String(categorySortPath(book.category)).toLowerCase())){
                ifBook = true;
                categoryBook.push(book);
            } 
        });

        

        currentItems.forEach(book => {
            if(book.category == Lowercategory){
                console.log("klkl")
                categoryBooks.push(
                <BooksItem
                            key={book._id}
                            bookId={book._id}
                            title={book.title}
                            author={book.author}
                            publicationYear={book.publication_year}
                            imageUrl={book.imageUrl}
                            category={book.category}
                            onInfoClick={bookInfoClickHandler}
                            comments={book.comments}
                            // setSrc={setSrc}
                            // src={src}
                />
                
                
            ); 
            }
    })

    return(
        <>
        <div className="hero_area1 ">
            <section className="animal_section1">
            
            {showInfo &&
                <ReadMore
                    key={selectedBook}
                    bookId={selectedBook}
                    infoClose={bookInfoCloseHandler}
                    show={showInfo}
                    comments={comments}
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                    setBooks={setBooks}
                />}
                <>
                <div className="container-fluid">
                    <Nav />
                </div>
                <section className="slider_section">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        
      >
       
        <div className="carousel-inner" >
            <div className="container-fluid">
              <div className="row" >
                <div className="col-md-5 offset-md-1">
                  <div className="detail-box" >
                    <h1>
                      <span>{category}</span>
                    </h1>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="img-box" >
                    <img src="../static/images/Open Doodles - Reading.png" alt="" />
                  </div>
                </div>
                </div>
                </div>
                </div>
                </div></section>
                </>
                <div className="book-box">
                <div style={{marginLeft: "30px"}} className="d-flex justify-content-start">
                    <Button className="book-box-button" onClick={goToCategories} variant="dark">
                        Всички категории
                    </Button>

                    {localStorage.getItem("auth") && 
                    <Button className="book-box-button" onClick={() => navigate("/add")} variant="dark">
                        Създай книга
                    </Button>
                    }

                </div>
                
                {ifBook?
                    <>
                    <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
      />
                        {/* <h1>{category} Category Books</h1>  */}
                        <div className="container">
                            <div className="animal_container">
                                {categoryBooks}
                            </div>
                        </div>

                        <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
      />
                    </>:
                    <div className="container">
                    <div className="animal_container" style={{marginBottom: "200px"}}>
                    
                        <h1>Няма намерени книги за тази категория.</h1>

                    </div>
                </div>
                }</div>
            </section>
            
            <Footer />
            </div>
        </>
    )
}