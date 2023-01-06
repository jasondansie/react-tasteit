import React from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import classes from './Home.module.css'


const Home = () => {
    return (
        <div className={classes.home}>
            <video loop muted autoPlay playsInline poster="" className="background-video">
                <source src="./burgers.mp4" type="video/mp4"></source>

            </video>

            <div className={classes.heropanel__content}>
                <h1>TasteIT</h1>
                <p>TasteIT is a recipe app which is made in REACT22S groug React Lessons</p>
                <button className={classes.herobutton}><NavLink to="/recipes">Browse recipes</NavLink></button>
            </div>
            <h2>Looking for recipes?</h2>
            <div className={classes.buttons}>
                <Button
                    title="Browse Recipes"
                    description="Find all your favorites in the collection. You can search recipes based on name or country."
                    linkText="All recipes"
                    link="/recipes"
                />
                <Button
                    title="Add recipes"
                    description="Recipes from your country missing? No worries, add on!"
                    linkText="Add a recipe"
                    link="/addNewRecipe"
                />
                <Button
                    title="Want to know more about our projects?"
                    description="Visit our programme homepage."
                    linkText="Business College Helsinki hompage"
                    link="http://bc.fi/"
                />
            </div>
        </div>
    );
};

export default Home;
