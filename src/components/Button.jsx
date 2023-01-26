import React from 'react';
import classes from './Button.module.css'

const Button = ({ title, description, navLink, target, linkText }) => {
    return (
        <div className={classes.button}>
            <h3>{title}</h3>
            <p>{description}</p>
            <a to={navLink} href={navLink} target={target} rel="noreferrer">{linkText}</a>
        </div>
    );
};

export default Button;