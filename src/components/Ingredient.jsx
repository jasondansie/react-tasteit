import React from 'react';
import classes from './Ingredient.module.css'

const Ingredient = ({id, quantity, ingredient}) => {
    return (
        <div className={classes.ingredients}>
            <h3>Quantity: {quantity}</h3>
            <h3>Ingredient: {ingredient}</h3>
        </div>
    );
};

export default Ingredient;