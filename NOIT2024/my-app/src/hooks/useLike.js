import { useState } from 'react';
import * as bookService from '../utils/booksService'
export let count = 0;

const useLike = () => {
  const [clicked, setClicked] = useState(false);
  const [likeOwners, setOwnersOfLike] = useState([]);
  const [src, setSrc] = useState('');

  const setLike = async (bookId) => {
    try {
        const ownerId = localStorage.getItem("auth").split(",")[2];
        const result = await bookService.getOne(bookId)
  
        const isLiked = result.ownersOfLike.includes(ownerId);
  
        if (!isLiked) {
            setClicked(false)
            count = Math.abs(count)
          setSrc('../../../static/images/heart1.png');
        } else {
            setClicked(true)
          setSrc('../../../static/images/heart2.png');
        }
  
      } catch (error) {
        console.error("Error handling like:", error);
      }
  }

  const handleLike = async (bookId, setShowAlert) => {
    try {
      const ownerId = localStorage.getItem("auth").split(",")[2];
      const result = await bookService.getOne(bookId);

      const isLiked = result.ownersOfLike.includes(ownerId);

      if (!isLiked) {
        setClicked(true);
        setOwnersOfLike((prevOwners) => [...prevOwners, ownerId]);
        setSrc('../../../static/images/heart2.png');
        setShowAlert(true);
        count += 1;
        console.log('Book liked successfully');
      } else {
        setClicked(false);
        setOwnersOfLike((prevOwners) => prevOwners.filter((id) => id !== ownerId));
        setSrc('../../../static/images/heart1.png');
        setShowAlert(true);
        count -= 1;
        console.log('Book unliked successfully');
      }

      const data = {
        like: !isLiked,
        ownersOfLike: isLiked ? result.ownersOfLike.filter((id) => id !== ownerId) : [...result.ownersOfLike, ownerId],
        count: count
      };

      await bookService.setLike(bookId, data);

      setTimeout(() => {
        setShowAlert(false);
      }, 1500);

    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return { clicked, handleLike, src, setLike };
};

export default useLike;