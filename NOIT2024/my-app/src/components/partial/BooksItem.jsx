import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import * as bookService from '../../utils/booksService';
import { Alert } from "react-bootstrap";
import useLike, { count } from "../../hooks/useLike";
//import {ReadMore} from "../otherPages/ReadMoreINfo";

export function BooksItem({
    bookId,
    title,
    author,
    imageUrl,
    category,
    onInfoClick,
    comments
}) {
    const [showAlert, setShowAlert] = useState(false);
    const [countLikes, setCountLikes] = useState()
   

    const infoClickHandler = () => {
        onInfoClick(bookId, comments);
    };

    useEffect(() => {
        setLike(bookId)
        bookService.getOne(bookId)
            .then(result => setCountLikes(result.countLikes == null? result.countLikes = 0: result.countLikes + 1))
    })

    const { clicked, handleLike, src, setLike } = useLike();

    const handleLikeButtonClick = async () => {
        await handleLike(bookId, setShowAlert);
      };

    return (
        <> 
                <div className="box b1" id={bookId}>
                    <div className="img-box">
                        <Link to={`/category/${category}/${bookId}`}
                        onClick={infoClickHandler}><img src={imageUrl}
                            alt={title}/></Link>
                    </div>
                    <div className="detail-box">
                        <h5>{title}</h5>
                        <h6>{author}</h6>
                        <div onClick={handleLikeButtonClick}>
                            <LikeButton src={src}/>
                            
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
                  Отменихте харесване!
                </Alert>
              ))}
            </>
          )}
        </>
      )}
                        <Link className="page-a" to={`/category/${category}/${bookId}`}
                        onClick={infoClickHandler}>Прочети още</Link>
                    </div>
                </div>
            
        </>
    );

}
