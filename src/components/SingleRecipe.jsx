import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Ingredient from './Ingredient';
import classes from './SingleRecipe.module.css'

const SingleRecipe = () => {
    const [data, setData] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3040/getSingleRecipe/${params.id}`)
            .then(
                (res) => {
                    setData(res.data[0]);
                });
    }, [params.id]);

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const displayIngredients = () => {

        let quantList = Object.assign([], data.quantity);
        let ingredList = Object.assign([], data.ingredients);

        return quantList.map((quant, index) => (
            <Ingredient
                key={randomNumber(1, 1000)}
                quantity={quant}
                ingredient={ingredList[index]}
            />
        ))
    }

    return (
        <div className={classes.singleRecipe}>
            <h1>{data.title}</h1>
            <div className={classes.middle}>
                <img src={data.image} alt={data.title} />
                <div className={classes.info}>
                    <div className={classes.description}>
                        <h4>By: {data.author}</h4>
                        <h2>Description</h2>
                        <p>{data.description}</p>
                    </div>
                    <div className={classes.ingredients}>
                        <h2>Ingredients</h2>
                        {displayIngredients()}
                    </div>
                    <div className={classes.prep}>
                        <div className={classes.preperations}>
                            <h2>Preparation</h2>
                            <p>{data.instructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleRecipe;