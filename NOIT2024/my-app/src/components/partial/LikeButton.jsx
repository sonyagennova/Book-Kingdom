import { useEffect, useState } from 'react';
import * as bookService from '../../utils/booksService';
import './LikeButton.scss'

export function LikeButton({src }) {
    //const [src, setSrc] = useState('../../../static/images/heart1.png');

    function onClick(e) {
        e.preventDefault()
        //setSrc('../../../static/images/heart2.png')
    }

    return(
        <>
            <div onClick={onClick}><img src={src} className='like-btn' ></img></div>
        </>
    )
}