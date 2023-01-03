import React from 'react';
import { NavLink } from 'react-router-dom';
import classes  from './Button.module.css'

const Button = (props) => {
    return (
        <div className={classes.button}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p><NavLink to={props.link}>{props.linkText}</NavLink></p>
        </div>
    );
};

export default Button;