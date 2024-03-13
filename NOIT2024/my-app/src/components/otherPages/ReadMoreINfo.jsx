//точки за отсъпка за издателство на всяка публикация се оставя по 1 точка, при 20 точки - 10 % отстъпка от някое от предоставените издателства. да сложа банер "Печели докато споделяш"


import { useEffect, useState } from "react";
import * as bookService from "../../utils/booksService"
import * as userService from "../../utils/userService"
import * as commentService from "../../utils/commentService"
import { Modal, Button, Form, Stack, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Edit } from "./editPage";
import { EditComment } from "./editComment";
import { createContext } from "react";
import { ProfilePage } from "./userProfile";
import useLike, { count } from "../../hooks/useLike";
import { LikeButton } from "../partial/LikeButton";
import { categorySortPath } from "../../utils/category";
import './ReadMoreINfo.scss';

export let selectedUser = "";

export function ReadMore({bookId, infoClose, show, setShowInfo, setBooks, userIds}){
  const accessToken = localStorage.getItem("accessToken")
    const [book, setBook] = useState([])
    const [booksData, setBookData] = useState([]);
    const [com, setCom] = useState([])
    const [user, setUser] = useState([])
    const [owner, setOwner] = useState([])
    const [image, setImage] = useState([])

    const [isAdmin, setIsAdmin] = useState(false);

    const [bookOwnerName, setBookOwnerName] = useState("");

    const [countLikes, setCountLikes] = useState()

    const [showAlert, setShowAlert] = useState(false);

    const [onCreatorClicked, setOnCreatorClicked] = useState(false);

    const { clicked, handleLike, src, setLike } = useLike();

    const [loading, setLoading] = useState(false);

    const handleLikeButtonClick = async () => {
        await handleLike(bookId, setShowAlert);
      };

      let uesrId = ''
    if(localStorage.getItem("auth")){
      uesrId = localStorage.getItem("auth").split(",")[2];
    }

    const [commentId, setCommentId] = useState('');

    const[addCommentClicked, setAddCommentClicked] = useState([]);
    const [hideEditCommentButton, setHideEditCommentButton]= useState(false);
    const [currentComment, setCurrentComment] = useState('');

    const category = book.category;

    const[showEdit, setShowEdit] = useState(false);
    const[showEditComment, setShowEditComent] = useState(false);
    const[hideEditButton, setHideEditButton] = useState(false);
    const navigate = useNavigate();

    const showEditPage = () => {
      setShowEdit(true)
      setHideEditButton(true);
    }

    const showEditCommentPage = (e) => {
      const clickedCommentId = e.currentTarget.getAttribute('data-comment-id');
      const selectedComment = com.find(comment => comment._id === clickedCommentId);
    
      if (selectedComment) {
        setCurrentComment(selectedComment.comment);
      }
    
      setCommentId(clickedCommentId);
      setShowEditComent(true);
      setHideEditCommentButton(true);
    };


    const deleteBook = async (e) => {
      e.preventDefault()
      try {
        const deleteConfirmed = window.confirm("Сигурни ли сте, че искате да изтриете тази публикация?");
      if(deleteConfirmed){
        await bookService.deleteBook(bookId, accessToken);
        setShowInfo(false)
        bookService.getAll()
          .then(result => {
            setBooks(result)
          })
  
        navigate(`/category/${String(categorySortPath(book.category)).toLowerCase()}`);
      }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }


  const deleteComment = async (e) => {
    e.preventDefault();
    const commentIdToDelete = e.currentTarget.getAttribute('data-comment-id');

    try {
      const deleteConfirmed = window.confirm("Сигурни ли сте, че искате да изтриете този коментар?");
      if(deleteConfirmed){
      setCommentId(commentIdToDelete);

      // Delete the comment from the server
      await commentService.deleteComment(commentIdToDelete, accessToken);

      // Update the UI by removing the deleted comment from the state
      setCom((prevState) => prevState.filter(comment => comment._id !== commentIdToDelete));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error (e.g., show an error message to the user)
    }
      
  }

    let nextId = 0

    let addComment = []
    
    useEffect(() => {
      setLoading(true);
      bookService.getOne(bookId)
      .then(result => {
        setBook(result)
        setCountLikes(result.countLikes)
      })
      .finally(() => setLoading(false));
      setLike(bookId)
      
    }, [bookId])
  
    const onUserClicked = () => {
      setOnCreatorClicked(true);
    }

    useEffect(() => {
      userService.getOne(uesrId)
      .then(result => {
        //console.log(result)
        setUser(result.name)
      })
    }, [])

    useEffect(() => {
      userService.getOne(book.ownerId)
        .then(result => {
          setBookOwnerName(result.name)
          
      })
    }, [book])

    useEffect(() => {
      userService.getOne(uesrId)
      .then(result => setOwner(result._id))
    }, [])

    useEffect(() => {
      userService.getOne(uesrId)
      .then(result => setImage(result.userImage))
    }, [])

    useEffect(() => {
      userService.getOne(uesrId)
      .then(result => setIsAdmin(result.isAdmin))
    }, [])

    //console.log(image)

    useEffect(() => {
      commentService.getAllComments()
      .then(result => {
        result[3].forEach(comment => {
        if(comment.bookId === bookId){
          addComment[nextId] = {_id: comment._id, comment: comment.comment, username: comment.name, image: comment.userImage, ownerId: comment.ownerId};
          setCom(addComment)
          setCom((state) => {
            return state
          })
          nextId ++;
        }
      })
    })
    }, [addCommentClicked])
    
    const comment = async (e) => {
      e.preventDefault()
      //console.log(com)
      
      const data = Object.fromEntries(new FormData(e.target.form));
      
      await commentService.setComments(data, bookId, user, image, owner, accessToken);
      await commentService.addComment(bookId, com, accessToken);
      setCom(prevState => [...prevState, addComment]);
   
      // Set addCommentClicked to true after adding a comment
      setAddCommentClicked(true);
      //console.log(com)
      
      document.getElementById("comment").value = ""; 
    }
    
    //console.log(book)
    return(
        <>
      <Modal show={show} onHide={infoClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{book.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {loading ? ( // Показва спинър, докато информацията се зарежда
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ) :(
            <><div className="body-content">
                  <div className="book-cover-image">
                    <img src={book.imageUrl} alt={book.title} />
                  </div>
                  <div>
                    {showEdit ? <Edit key={bookId} setBook={setBook} setShowInfo={setShowInfo} category={category} bookId={bookId} book={book} setShowEdit={setShowEdit} show={showEdit} hideEditButton={setHideEditButton} /> :
                      <>
                        <h1>{book.title}</h1>
                        <h3>{book.author}</h3>
                        <h5>Издателство: {book.publisher}</h5>
                        <div onClick={handleLikeButtonClick}>
                          <LikeButton src={src} />

                        </div>
                        {/* <p>{countLikes}</p> */}
                        {showAlert && (
                          <>
                            {clicked ? (
                              <>
                                {['success'].map((variant) => (
                                  <Alert key={variant} variant={variant}>
                                    Харесахте тази публикация!
                                  </Alert>
                                ))}
                              </>
                            ) : (
                              <>
                                {['success'].map((variant) => (
                                  <Alert key={variant} variant={variant}>
                                    Отменихте харесването!
                                  </Alert>
                                ))}
                              </>
                            )}
                          </>
                        )}
                        <p className="modal-book-description">{book.description}</p>
                        <p>Създадено от {bookOwnerName ? <Link to={localStorage.getItem("auth") && book.ownerId == localStorage.getItem("auth").split(",")[2] ? "/me" : "/" + book.ownerId} onClick={onUserClicked}>{bookOwnerName}</Link> : <span style={{ color: "red" }}>Изтрит потребител</span>}</p>

                        {/* {owner == ownerId && <h6 style={{color: "tomato"}}>Creator: {user}</h6>} */}
                      </>}
                  </div>
                </div><Modal.Body>
                    <Form style={{ marginBottom: "15px" }}>
                      <Form.Label><h3>Ревюта</h3></Form.Label>
                      {localStorage.getItem("auth") && <>
                        <Form.Group className="mb-3" controlId="comment">

                          <Form.Control type="text" placeholder="Добави коментар" name="comment" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={comment}>
                          Коментирай
                        </Button></>}
                    </Form>

                    {com.map(comment => {
                      return (
                        <Form key={comment._id} id={`commentForm_${comment._id}`}>
                          <div className="d-flex flex-row comment-row">
                            <div className="p-2"><span className="round"><img src={comment.image} alt="user" width="50" /></span></div>
                            <div className="comment-text w-100">
                              <h5>{comment.username}</h5>
                              <div className="comment-footer">

                              </div>
                              <p className="m-b-5 m-t-10" id="comment">{comment.comment}</p>
                              {showEditComment && <EditComment key={comment._id} com={com} setCom={setCom} show={showEditComment} commentId={commentId} comment={currentComment} setShowEditComment={setShowEditComent} hideButton={setHideEditCommentButton} />}
                              <Modal.Footer>
                                {comment.ownerId == owner ?
                                  <>
                                    <Button variant="warning" data-comment-id={comment._id} onClick={showEditCommentPage} hidden={hideEditCommentButton}>Редактирай</Button>
                                    <Button variant="danger" data-comment-id={comment._id} onClick={deleteComment}>Изтрий</Button>
                                  </> :
                                  <>
                                    {isAdmin &&
                                      <>
                                        <Button variant="warning" data-comment-id={comment._id} onClick={showEditCommentPage} hidden={hideEditCommentButton}>Редактирай</Button>
                                        <Button variant="danger" data-comment-id={comment._id} onClick={deleteComment}>Изтрий</Button>
                                      </>}
                                  </>}
                              </Modal.Footer>
                            </div>
                          </div>
                        </Form>
                      );

                    })}


                  </Modal.Body></>
    )}</Modal.Body>
        <Modal.Footer>
          {book.ownerId == owner?
            <>
              <Button variant="warning" onClick={showEditPage} hidden={hideEditButton}>Редактирай</Button>
              <Button variant="danger" onClick={deleteBook}>Изтрий</Button>
            </>:
            <>
            {isAdmin && 
              <>
              <Button variant="warning" onClick={showEditPage} hidden={hideEditButton}>Редактирай</Button>
              <Button  onClick={deleteBook}>Изтрий</Button>
            </>
            }
            </>
          }
          <Button variant="secondary" onClick={infoClose}>
            Затвори
          </Button>
        </Modal.Footer>
      </Modal>
        </>

      );
}