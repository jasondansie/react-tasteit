import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import classes from './Recipes.module.css'

const Recipes = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState({
        string: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3040/recipes')
            .then(
                (res) => {
                    setData(res.data);
                });
    }, []);

    const searchHandler = (e) => {
        setSearch({
            string: e.target.value,
        });
    }

    return (
        <div className={classes.recipes} >
            <h1>Our Recipes</h1>
            <div className={classes.search}>
                <label htmlFor="search">Search: </label>
                <input onChange={(e) => searchHandler(e)} name="search"></input>
            </div>
            <div className={classes.cards}>
                {
                    data.filter(recipe =>
                        recipe.title.includes(search.string)).map((card) => (
                            <Card
                                key={card.id}
                                flag={card.flag}
                                image={card.image}
                                title={card.title}
                                link={`/SingleRecipe/${card.id}`}
                            />
                        ))
                }
            </div>
        </div>
    );
};

export default Recipes;