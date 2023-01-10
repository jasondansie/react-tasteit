import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Form.module.css'

const Form = () => {
    const [data, setData] = useState([]);
    const [recipe, setRecipe] = useState([]);
    
    const [ingredients, setIngredients] = useState([{
        quantity: "",
        ingredient: ""
    }]);

    const [formValues, setFormValues] = useState([{
        id: "",
        title: "",
        author: "",
        country: "",
        flag: "",
        description: "",
        image: "/images/barbecue.jpg",
        quantity: "",
        instructions: "",
    }]);


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

    let handleChange = (i, e) => {
        console.log("changing: ", ingredients)
        let newFormValues = [...ingredients];
        newFormValues[i][e.target.name] = e.target.value;
        setIngredients(newFormValues);
    }

    const handleMainFormChange = (e) => {
        let newFormValues = [...formValues];
        console.log("newFormValues", newFormValues);
        console.log("target", e.target.name);
        newFormValues[0][e.target.name] = e.target.value;

        if (e.target.name === "country") {
            console.log("calling flag change with: ", e.target.value);
            handleFlagChange(e.target.value);
        }
        setFormValues(newFormValues);
    }

    const handleFlagChange = (countryName) => {
        let newFormValues = [...formValues];
        let flag = data.filter(country => country.name.common.includes(countryName))
        
        newFormValues[0]["flag"] = flag[0].flags.png;
        newFormValues[0]["id"] = recipe.length + 1;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        console.log("adding");
        setIngredients([...ingredients, { quantity: "", ingredient: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...ingredients];
        newFormValues.splice(i, 1);
        setIngredients(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        let str1 = `id=${formValues[0].id}&title=${formValues[0].title}&athor=${formValues[0].author}&country=${formValues[0].country}&flag=${formValues[0].flag}&description=${formValues[0].description}&image=${formValues[0].image}&instructions=${formValues[0].instructions}`;
        
        console.log("obj2", ingredients);
        let str2 = "";
        let i = 0;
        ingredients.forEach(ingredient => {
            console.log("round: " , i);
            if (str2 === "") {
                str2 = `&quantity=${ingredient.quantity}&ingredients=${ingredient.ingredient}`;
            }
            else{str2 = `${str2}&quantity=${ingredient.quantity}&ingredients=${ingredient.ingredient}`;

            }
            
            console.log("str2", str2);                   
            console.log("str1", str1);
            i++;
        });
        str1 = `${str1}${str2}`;
        alert(str1);
        axios
            .post("http://localhost:3030/input", str1)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
    }

    return (
        <div className={classes.formContent}>
            <h1>Add a new recipe</h1>
            <form action="" method="" onSubmit={handleSubmit}>
                <div className={classes.formInput}>
                    <input type="text" id="id" name="id" size="40" hidden></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" size="40" onChange={e => handleMainFormChange(e)}></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="author">Author:</label>
                    <input type="text" name="author" size="40" onChange={e => handleMainFormChange(e)}></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="country">Country:</label>
                    <select id="country" name="country" onChange={e => handleMainFormChange(e)}>

                        {data.map((country) => (
                            <option key={country.name.common} name="country">{country.name.common} </option>
                        ))}

                    </select>
                </div>
                <div className={classes.formInput}>
                    <input type="text" id="flag" name="flag" size="40"  hidden onChange={e => handleMainFormChange(e)}></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" rows="4" cols="50" onChange={e => handleMainFormChange(e)} />
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="image">Image:</label>
                    <input type="text" id="image" name="image" size="10" defaultValue={'/images/barbecue.jpg'} onChange={e => handleMainFormChange(e)}></input>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="ingredients">Ingredients:</label>
                </div>
                <div className={classes.formInput}>
                    {ingredients.map((element, index) => (

                        <div className="form-inline" key={index}>
                            <label>quantity</label>
                            <input type="text" name="quantity" value={element.quantity || ""} onChange={e => handleChange(index, e)} />
                            <label>ingredients</label>
                            <input type="text" name="ingredient" value={element.ingredient || ""} onChange={e => handleChange(index, e)} />
                            {
                                index ?
                                    <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                    : null
                            }
                        </div>
                    ))}
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="instructions">Instructions:</label>
                    <input type="text" id="instructions" name="instructions" size="10" onChange={e => handleMainFormChange(e)}></input>
                </div>
                <div className="button-section">
                    <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                    <button className="button submit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;