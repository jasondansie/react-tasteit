import React from 'react';
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.Footer}>
            <h3>Created by Jason Dansie</h3>
            <h3>My <a href="https://public.bc.fi/s2201195/Portfolio/">portfolio</a></h3>
        </footer>
    );
};

export default Footer;