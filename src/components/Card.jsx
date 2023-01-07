import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Card.module.css'

const Card = ({ flag, image, title, link }) => {
    return (
        <div className={classes.card}>
            <div className={classes.flag}>
                <img src={flag} alt="" />
            </div>
            <img className={classes.mainImage} src={image} alt="" />
            <div className={classes.container}>
                <h4>{title}</h4>
                <button className={classes.button}><NavLink to={link}>Show More</NavLink></button>
            </div>
        </div>
    );
};

export default Card;