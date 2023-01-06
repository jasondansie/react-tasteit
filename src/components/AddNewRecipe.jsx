import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './AddNewRecipe.module.css'

const AddNewRecipe = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(
                (res) => setData(res.data));
    }, []);

    return (
        <div className={classes.formContent}>
            <h1>Add a new recipe</h1>
            <form action="http://localhost:3030/input" method='POST'>
                <div className={classes.formInput}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" size="40"></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" name="author" size="10"></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="country">Country:</label>
                    <select name="country" id="country  ">

                        {data.map((country) => (
                            <option value={country.name.common} key={country.name.common}>{country.name.common}</option>
                        ))}

                    </select>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows="4" cols="50" />
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="image">Image:</label>
                    <input type="text" id="image" name="image" size="10"></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <input type="text" id="ingredients" name="ingredients" size="10"></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="instructions">Instructions:</label>
                    <input type="text" id="instructions" name="instructions" size="10"></input>
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    );
};

export default AddNewRecipe;