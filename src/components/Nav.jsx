import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';


const Nav = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.logo}>
                <NavLink to="/"><img src='/images/TasteIt.png' alt="" /></NavLink>
            </div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="Recipes">Recipes</NavLink></li>
                <li><NavLink to="Form">Add New Recipe</NavLink> </li>
            </ul>
        </nav>
    );
};

export default Nav;