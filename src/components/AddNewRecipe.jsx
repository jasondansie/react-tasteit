import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './AddNewRecipe.module.css'
import IngredientInput from './IngredientInput';

const AddNewRecipe = () => {
    const [data, setData] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [flag, setFlag] = useState([]);
    const [uid, setUid] = useState([]);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(
                (res) => setData(res.data));

        axios.get('http://localhost:3030/all')
            .then(
                (res) => {
                    setRecipe(res.data.result);
                });
    }, []);

    const addIngredients = () => {
        setCounter(counter + 1);
        console.log("counter", counter);
        let ingred = ingredients;
        ingred.push(<IngredientInput
            key={counter}
        />);
        console.log("ingred", ingred);

        setIngredients(ingred);


        //createIngredientsInput();
    }

    const createIngredientsInput = () => {

        for (let i = 0; i < counter; i++) {
            if (ingredients.length === 0) {
                setIngredients(<IngredientInput />);
            }
            else {
                setIngredients(ingredients + <IngredientInput />);
            }

        }
        console.log("ingerdientInput", ingredients);

    }

    const onChangeHandler = (e) => {
        let flag = data.filter(country => country.name.common.includes(e.target.value))
        setFlag(flag[0].flags.png);
        setUid(recipe.length + 1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    };


    return (
        <div className={classes.formContent}>
            <h1>Add a new recipe</h1>
            <form action="http://localhost:3030/input" method='POST' onSubmit={handleSubmit}>
                <div className={classes.formInput}>
                    <input type="text" id="id" name="id" size="40" placeholder={uid} defaultValue={uid} hidden></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" size="40"></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="author">Author:</label>
                    <input type="text" name="author" size="10"></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="country">Country:</label>
                    <select name="country" id="country" onChange={(e) => onChangeHandler(e)}>

                        {data.map((country) => (
                            <option key={country.name.common}>{country.name.common} </option>
                        ))}

                    </select>
                </div>
                <div className={classes.formInput}>
                    <input type="text" id="flag" name="flag" size="40" placeholder={flag} defaultValue={flag} hidden></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows="4" cols="50" />
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="image">Image:</label>
                    <input type="text" id="image" name="image" size="10" defaultValue={'/images/barbecue.jpg'}></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="ingredients">Ingredients:</label>

                </div>
                <IngredientInput />
                <div>{ingredients}</div>

                <button onClick={() => addIngredients()}>Add more</button>
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