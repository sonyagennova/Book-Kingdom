import { Footer } from "../homePageSections/Footer";
import { Info } from "../homePageSections/InfoSection";
import { Nav } from "../partial/Navbar";
import * as bookService from '../../utils/booksService';
import * as userService from '../../utils/userService';
import * as commentService from '../../utils/commentService';
import { Fragment, useContext, useEffect, useState } from "react";
import './CategoriesPage.scss'
import './CategoryPage.scss'
import './userProfile.scss'
import ReactPaginate from 'react-paginate';
import { ReadMore } from "./ReadMoreINfo";
import { Button, Card, Col, Container, FormGroup, InputGroup, ListGroup, Modal, Row, Form } from "react-bootstrap";
import images from '../../utils/imageFilenames.js';
import useLike from "../../hooks/useLike";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/logout";

export function ProfilePage(){
    const [books, setBooks] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userImage, setUserImage] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);

  const [userBooks, setUserBooks] = useState([])

  const [openModal, setOpenModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false)
  const [userName, setUserName] = useState("");

  const [openVouchers, setOpenVouchers] = useState(false)
  const [vouchers, setVouchers] = useState([]);

  const [point, setPoint] = useState("")

  const [loading, setLoading] = useState(false);

  const{clicked, setLike} = useLike()

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const userId = localStorage.getItem("auth").split(',')[2];

  const navigate = useNavigate();

    useEffect(() => {
      setLoading(true);
        bookService.getAll()
            .then(result => setBooks(result))
            .finally(() => setLoading(false));
        setUserName(localStorage.getItem("auth").split(',')[0])
        setLike()
    }, [])

    useEffect(() => {
      // Filter the books owned by the user
      const userOwnedBooks = books.filter(book => book.ownerId === localStorage.getItem("auth").split(",")[2]);
      setUserBooks(userOwnedBooks);
    }, [books]); // Trigger the effect whenever the books array changes
    
    // Calculate pagination
    const pageCount = Math.ceil(userBooks.length / itemsPerPage);
    const endOffset = Math.min(itemOffset + itemsPerPage, userBooks.length);
    const currentItems = userBooks.slice(itemOffset, endOffset);
    
    // Handle page click event
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage;
      setItemOffset(newOffset);
    };

    useEffect(() => {
      userService.getOne(userId)
        .then(result => {
          setUserImage(result.userImage)
        })
    }, [])

    const openInfo = (book) => {
        setSelectedBook(book);
        setShowInfo(true);
    }

    const handleDeleteProfile = async (e) => {
      e.preventDefault()
      const deleteConfirmed = window.confirm("Сигурни ли сте, че искате да изтриете профила си?");
      
      if (deleteConfirmed) {
        try {
          await userService.deleteUser(userId);
          await logout(e)
        } catch (error) {
          console.error("Възникна грешка: ", error);
        }
      }
    };

    const bookInfoCloseHandler = () => {
        setShowInfo(false);
        setSelectedBook(null);
    }

    const OnOpenModal = () => {
        setOpenModal(true);
        setDisabled()
    }

    const OnCloseModal = () => {
      setOpenModal(false);
      setEditProfile(false)
  }

  const setDisabled = (e) => {
      if(document.getElementById("custom-img-input").value == ""){
        setDisabledButton(true);
      } else {
        setDisabledButton(false)
      }
  }

  const onChooseProfileImage = (e) => {
    try {
      const image = e.target.parentNode.querySelector("img");
  
      // Update the UI immediately
      setUserImage(image.src);
      setOpenModal(false);
  
      // Perform the asynchronous API call in the background
      const data = {
        imageUrl: image.src,
      };
  
      userService.editUserImage(userId, data)
        .then(result => {
          if (!result.success) {
            console.error('Error choosing profile image:', result.message);
          }
        })
        .catch(error => {
          console.error('Error choosing profile image:', error);
        });
    } catch (error) {
      console.error('Error choosing profile image:', error);
    }
  };

  const onEditProfile = (e) => {
    try {
      const data = Object.fromEntries(new FormData(e.target.form));
      setEditProfile(false);
      setUserName(data.name)
      const authData = localStorage.getItem("auth");
      const authArray = authData.split(',');
      authArray[0] = data.name;
      const updatedAuthData = authArray.join(',');
      localStorage.setItem("auth", updatedAuthData);
  
      userService.editUserName(userId, data)
        .then(result => {
          if (!result.success) {
            console.error('Error choosing profile image:', result.message);
          }
        })
        .catch(error => {
          console.error('Error choosing profile image:', error);
        });
    } catch (error) {
      console.error('Error choosing profile image:', error);
    }
  };

  const onCustomChooseProfileImage = (e) => {
    try {
      const image = e.target.parentNode.querySelector("input");
  
      // Update the UI immediately
      setUserImage(image.value);
      setOpenModal(false);
      console.log(image.value)
      // Perform the asynchronous API call in the background
      const data = {
        imageUrl: image.value.toString(),
      };
  
      userService.editUserImage(userId, data)
        .then(result => {
          if (!result.success) {
            console.error('Грешка в избора на профилна снимка:', result.message);
          }
        })
        .catch(error => {
          console.error('Грешка в избора на профилна снимка:', error);
        });
    } catch (error) {
      console.error('Грешка в избора на профилна снимка:', error);
    }
  };


  useEffect(() => {
    const updateComments = async () => {
      try {
        const comments = await commentService.getAllComments();

        for (const comment of comments[3]) {
          if (comment.ownerId === localStorage.getItem("auth").split(",")[2]) {
            comment.userImage = userImage;
            await commentService.editCommentImage({ userImage: comment.userImage }, comment._id, localStorage.getItem("accessToken"));
          }
        }
      } catch (error) {
        console.error('Грешка в актуализацията на коментарите:', error);
        // Handle error (e.g., show an error message, retry logic, etc.)
      }
    };

    updateComments();
  }, [userImage]);

  const getPoints = async() => {
    await userService.getOne(localStorage.getItem("auth").split(",")[2])
      .then(result => setPoint(result.points))
  }

  getPoints()

  const getVouchers = async () => {
    await userService.getOne(localStorage.getItem("auth").split(",")[2])
      .then(result => {
        const userVouchers = [];
        for (const voucher in result.vouchers) {
          userVouchers.push(result.vouchers[voucher]);
        }
        setVouchers(userVouchers);
      })
      .catch(error => console.error('Error getting vouchers:', error));
  }
  
  // Call the function
  getVouchers();

    return(
        <>
        <section className="animal_section1 back">
        <div className="container-fluid">
            <Nav/>
        </div>

        <div className="profile-card">
  <div className="main-profile-area">
    <div className="img-container">
      <img
        src={userImage}
        alt=""
        className="user-img"
      />
      <Button className="choose-img" onClick={OnOpenModal}>Смени</Button>
    </div>
    <div className="wrapper">
      <div className="user-info">
        <section className="left-column">
          <h3 className="profile-names">{userName}</h3>
          <p className="label">Email</p>
          <p className="profile-data">{localStorage.getItem("auth").split(",")[1]}</p>
          <p className="label">Точки</p>
          <p className="profile-data">{point}</p>
          {/* <p className="label">Country</p>
          <p className="profile-data">Brazil</p>
          <p className="label">Role</p>
          <p className="profile-data">Booklover</p> */}
        </section>
        <section className="right-column">
          <button className="edit-user" onClick={() => setEditProfile(true)}>Редактирай</button><br/>
          <button className="edit-user" onClick={() => setOpenVouchers(true)}>Ваучери</button><br/>
          <button className="delete-user" onClick={handleDeleteProfile}>Изтрий профил</button>
          {/* <Button variant="danger">Изтрий</Button> */}
        </section>
      </div>
      <h3 className="profile-names">Моите книги</h3>
      {loading ? ( // Показва спинър, докато информацията се зарежда
         <div className="spinner-border" role="status">
         <span class="loader"></span>
        </div>
        ) : ( <>
      {books.length > 0 &&
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
      }
      <div className="profile-tabs">
        
          {books.length > 0 ? (<>
{currentItems.map((book) => (
  book.ownerId == localStorage.getItem("auth").split(",")[2] ? (
    <div className=" flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            className="book-cover-img"
            src={book.imageUrl}
            alt=""
          />
        </div>
        <div className="flip-card-back">
          <div>
            <p className="author-flip-card-back">{book.author}</p>
            <h3>{book.title}</h3>
            <p className="cat">{book.category}</p>
            <button className="view-book" onClick={() => openInfo(book)}>Прочети още</button>
          </div>
        </div>
      </div>
    </div>
  ) : null
))}
    </>) : (
    <h3>Нямате създадени книги. Създай сега!</h3>
  )}
      </div></>)}
      <h3 className="profile-names">Харесани книги</h3>
      {loading ? ( // Показва спинър, докато информацията се зарежда
         <div className="spinner-border" role="status">
         <span class="loader"></span>
        </div>
        ) : ( <>
      <div className="profile-tabs">
        
        {books.length > 0 ? (
  books.map((book) =>
    book.ownersOfLike.includes(localStorage.getItem("auth").split(",")[2]) ? (

      <div className=" flip-card">
<div className="flip-card-inner">
  <div className="flip-card-front">
    <img
      className="book-cover-img"
      src={book.imageUrl}
      alt=""
    />
  </div>
  <div className="flip-card-back">
    <div>
      <p className="author-flip-card-back">{book.author}</p>
      <h3>{book.title}</h3>
      <p className="cat">{book.category}</p>
      <button className="view-book" onClick={() => openInfo(book)}>Прочети ощe</button>
    </div>
  </div>
</div>
</div>
    ) : null
  )
) : (
  <h3>Нямате харесани книги.</h3>
)}
    </div></>)}
    </div>
  </div>
</div>


        <div className="blockquote mb-0" style={{float: "left", padding: "100px", color: "black"}}>
          <Modal size="lg" show={openModal} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изберете си профилна снимка
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
     <form>
        <h4>Прикачете URL линк:</h4>
           <div>
              <input type="text" id="custom-img-input" placeholder="https://image-url/..." disabled={disabledButton}></input>
           </div><br/>
           <Button variant="success" onClick={onCustomChooseProfileImage}>Избери</Button>
          </form><br/><br/>
        <Container>
        <Row>
       
  {images.map((image, index) => (
    <Col key={index} xs={6} md={4} className="mx-auto text-center">
    <img src={image} name="imageUrl" id="userImage" alt={`Image ${index}`} style={{ width: "100px" }} /><br/><br/>
    <Button onClick={onChooseProfileImage} variant="success">Избери</Button><br/><br/>
  </Col>
  ))}
</Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={OnCloseModal}>Затвори</Button>
      </Modal.Footer>
    </Modal>
        </div>


        <Modal show={editProfile} onHide={OnCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирай Профил</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Име</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder={localStorage.getItem("auth").split(",")[0]}
                autoFocus
              />
            </Form.Group>
            <Button variant="primary" onClick={onEditProfile}>
            Запази
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={OnCloseModal}>
            Затвори
          </Button>
          
        </Modal.Footer>
      </Modal>
      
        {selectedBook && (
        <ReadMore
          bookId={selectedBook._id}
          infoClose={bookInfoCloseHandler}
          show={showInfo}
          setShowInfo={setShowInfo}
        />
      )}

      {openVouchers && 
        <Modal size="lg" show={openVouchers} onHide={() => setOpenVouchers(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ваучери</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {vouchers.length == 0? <p>Все още нямате ваучери. Създавайте книги и печелете точки.
           На всеки 20 точки получавате <span style={{color: "tomato"}}>10% намаление</span> от избрано издателство.</p>:
           vouchers.map((voucher, index) => (
          <Fragment key={index}>
          <img style={{ width: "400px" }} src={voucher} alt={`Voucher ${index}`} />
          <br />
        </Fragment>
        ))}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpenVouchers(false)}>
            Затвори
          </Button>
        </Modal.Footer>
      </Modal>
      }
        <Footer />
      </section>

      </>
    )
}