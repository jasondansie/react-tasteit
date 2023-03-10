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

        axios.get('http://localhost:3040/recipes')
            .then(
                (res) => {
                    setRecipe(res.data);
                });
    }, []);

    let handleChange = (i, e) => {
        let newFormValues = [...ingredients];
        newFormValues[i][e.target.name] = e.target.value;
        setIngredients(newFormValues);
    }

    const handleMainFormChange = (e) => {
        let newFormValues = [...formValues];
        newFormValues[0][e.target.name] = e.target.value;

        if (e.target.name === "country") {
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
        setIngredients([...ingredients, { quantity: "", ingredient: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...ingredients];
        newFormValues.splice(i, 1);
        setIngredients(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();

        let tempCountry;
        let tempFlag;
        let tempId;

        if (formValues[0].country === "") {
            tempCountry = "Finland";
        }
        else {
            tempCountry = formValues[0].country;
        }

        if (formValues[0].flag === "") {
            tempFlag = "https://flagcdn.com/w320/fi.png";
            tempId = recipe.length + 1;
        }
        else {
            tempFlag = formValues[0].flag;
            tempId = formValues[0].id;
        }

        if (formValues[0].title === "" || formValues[0].author === "" || tempCountry === "" || tempFlag === "" || formValues[0].description === "" || formValues[0].instructions === "") {
            alert("Form fields are empty");
        }
        else {


            let str1 = `id=${tempId}&title=${formValues[0].title}&author=${formValues[0].author}&country=${tempCountry}&flag=${tempFlag}&description=${formValues[0].description}&image=${formValues[0].image}&instructions=${formValues[0].instructions}`;
            let str2 = "";

            ingredients.forEach(ingredient => {
                if (str2 === "") {
                    str2 = `&quantity=${ingredient.quantity}&ingredients=${ingredient.ingredient}`;
                }
                else {
                    str2 = `${str2}&quantity=${ingredient.quantity}&ingredients=${ingredient.ingredient}`;
                }
            });
            str1 = `${str1}${str2}`;
            axios
                .post("http://localhost:3040/input", str1)
                .then((res) => alert("Recipe added"))
                .catch((error) => console.log(error));

            event.target.reset();
            setIngredients([{ quantity: "", ingredient: "" }])

        }

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
                    <select id="country" name="country" placeholder='Finland' onChange={e => handleMainFormChange(e)}>

                        {data.map((country) => (
                            <option key={country.name.common} name="country">{country.name.common} </option>
                        ))}

                    </select>
                </div>
                <div className={classes.formInput}>
                    <input type="text" id="flag" name="flag" size="40" placeholder='https://flagcdn.com/w320/fi.png' hidden onChange={e => handleMainFormChange(e)}></input>
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

                        <div className={classes.form_inline} key={index}>
                            <label>quantity</label>
                            <input type="text" name="quantity" value={element.quantity || ""} onChange={e => handleChange(index, e)} />
                            <label>ingredients</label>
                            <input type="text" name="ingredient" value={element.ingredient || ""} onChange={e => handleChange(index, e)} />
                            {
                                index ?
                                    <button type="button" className={classes.button_remove} onClick={() => removeFormFields(index)}>Remove</button>
                                    : null
                            }
                        </div>
                    ))}
                    <div className="button-section">
                        <button className="add" type="button" onClick={() => addFormFields()}>Add</button>
                    </div>
                </div>
                <div className={classes.formInput}>
                    <label htmlFor="instructions">Instructions:</label>
                    <input type="text" id="instructions" name="instructions" size="10" onChange={e => handleMainFormChange(e)}></input>
                </div>
                <div className="button-section">
                    <button className="submit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;