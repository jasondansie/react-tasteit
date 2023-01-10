import React from 'react';
import classes from './Ingredient.module.css'

const Ingredient = ({id, quantity, ingredient}) => {
    return (
        <div key={`${id}.1`} className={classes.ingredients}>
            <h3 key={`${id}.3`}>Quantity: {quantity}</h3>
            <h3 key={`${id}.5`}>Ingredient: {ingredient}</h3>
        </div>
    );
};

export default Ingredient;