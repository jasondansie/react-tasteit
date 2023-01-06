import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Card from './Card';
import classes from './Recipes.module.css'

const Recipes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(
                (res) => setData(res.data));
    }, []);

    return (
        <div className={classes.recipe_content}>
           <p>Serch for a recipe</p> 
           <input type="text" size={40} />
            <h2>Our recipes</h2>
           <div className={classes.recipes}>
            <Card
                flag="https://flagcdn.com/w320/pe.png"
                image="/images/TasteIt.png"
                title="First Card"
            />
            <Card
                flag="https://flagcdn.com/w320/pe.png"
                image="https://www.w3schools.com/howto/img_avatar.png"
                title="Second Card"
            />
            <Card
                flag="https://flagcdn.com/w320/pe.png"
                image="https://www.w3schools.com/howto/img_avatar.png"
                title="Third Card"
            />
           </div>
        </div>
    );
};

export default Recipes;