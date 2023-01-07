import React from 'react';
import classes from './AddNewRecipe.module.css'

const IngredientInput = ({ id }) => {
    return (
        <div className={classes.ingredients}>
            <div className={classes.formInput}>
                <label htmlFor="quantity">quantity:</label>
                <input type="text" key={id} name="quantity" size="20"></input>
            </div>
            <div className={classes.formInput}>
                <label htmlFor="ingredient">Ingredient:</label>
                <input type="text" key={id} name="ingredient" size="20"></input>
            </div>
        </div>
    );
};

export default IngredientInput;