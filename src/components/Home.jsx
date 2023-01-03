import React from 'react';
import Button from './Button';
import classes from './Home.module.css'


const Home = () => {
    return (
        <div>            
            <video loop muted autoPlay playsInline poster="URL/TO/poster.jpg" className="background-video">
                <source src="https://vod-progressive.akamaized.net/exp=1672765985~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F242%2F15%2F376213205%2F1569718532.mp4~hmac=87200d3bb519d91cdf2294be07675530b7cef628c6b94fd906d9714189c0e759/vimeo-prod-skyfire-std-us/01/242/15/376213205/1569718532.mp4" type="video/mp4"></source>
            </video>
            
            <div className={classes.heropanel__content}>
                <h1>TasteIT</h1>
                <p>TasteIT is a recipe app which is made in REACT22S groug React Lessons</p>
                <button>Browse recipes</button>
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
                    link="https://www.bc.fi/"
                />
            </div>
        </div>               
    );
};

export default Home;
