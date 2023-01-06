import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import classes from './Recipes.module.css'

const Recipes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/all')
            .then(
                (res) => {
                    setData(res.data.result);
                });
    }, []);

    const reciptList = data.map((recipe) => {
        return (
            <Card
                key={recipe.id}
                flag={recipe.flag}
                image={recipe.image}
                title={recipe.name}
            />
        );
    });

    return (
        <div className={classes.recipe_content}>
            <p>Serch for a recipe</p>
            <input type="text" size={40} />
            <h2>Our recipes</h2>
            <div className={classes.recipes}>
                {
                    data.map((recipe) => (
                        <Card
                            key={recipe.id}
                            flag={recipe.flag}
                            image={recipe.image}
                            title={recipe.name}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Recipes;