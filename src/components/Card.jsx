import React from 'react';
import classes from './Card.module.css'

const Card = ({ flag, image, title }) => {
    return (
        <div className={classes.card}>
            <div className={classes.flag}>
                <img src={flag} alt="" />
            </div>
            <img className='mainImage' src={image} alt="" />
            <div className={classes.container}>
                <h4>{title}</h4>
                <button className={classes.button}>Show more</button>
            </div>
        </div>
    );
};

export default Card;