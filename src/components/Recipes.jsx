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

    return (
        <div className={classes.bg} >
                <h1>Our Recipes</h1>
                <div className={classes.cards}>
                    {data.map((card) => (
                        <Card
                        key={card.id}
                        flag={card.flag}
                        image={card.image}
                        title={card.name}
                        link={`/SingleRecipe/${card.id}`}
                        />
                    ))}
                </div>
            </div>
    );
};

export default Recipes;