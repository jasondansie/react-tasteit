import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Ingredient from './Ingredient';
import classes from './SingleRecipe.module.css'

const SingleRecipe = () => {
    const [data, setData] = useState([]);
    const params = useParams();

    useEffect(() => {

        axios.get(`http://localhost:3030/getSingleRecipe/${params.id}`)
            .then(
                (res) => {
                    setData(res.data.result);
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
                id={randomNumber(1, 1000)}
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
                <div className={classes.descript}>
                    <p>{data.description}</p>
                    <h4>{data.author}</h4>
                </div>
            </div>
            <div className={classes.prep}>
                <div className={classes.preperations}>
                    <h2>Preparation</h2>
                    <p>{data.instructions}</p>
                </div>
                <div className={classes.ingredients}>
                    <h2>Ingredients</h2>
                    {displayIngredients()}

                </div>
            </div>
        </div>
    );
};

export default SingleRecipe;