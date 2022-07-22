import React, { useState } from 'react';

const Tour = (props) => {

    const [isReadMore, setIsReadMore] = useState(true)
    const { id, title, img, description, price, removeItem } = props

    const formatPrice = (price) => `$ ${price.toLocaleString('en-US')}`
    const toggleSpan = () => setIsReadMore(!isReadMore)


    return (
        <article className='single-tour'>
            <img src={img} alt=""/>
            <div className='tour-info'>
                <h4>{title}</h4>
                <p>{formatPrice(price)}</p>
            </div>
            <p className='description'> {isReadMore ? description.slice(0, 150) : description} <span
                className='readMore' onClick={toggleSpan}>{isReadMore ? "...read more" : "show less"}</span></p>
            <button onClick={() => removeItem(id)}>Not interested</button>

        </article>
    );
};

export default Tour;