import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Form.module.css'

const Form = () => {
    const [data, setData] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [flag, setFlag] = useState([]);
    const [uid, setUid] = useState([]);

    const [formValues, setFormValues] = useState([{
        id: "",
        title: "",
        author: "",
        country: "",
        flag: "",
        description: "",
        image: "",
        quantity: "",
        ingredient: "",
        instructions: ""
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
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
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
        setUid(recipe.length + 1);
        newFormValues[0]["flag"] = flag[0].flags.png;
        newFormValues[0]["id"] = recipe.length + 1;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { quantity: "", ingredient: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        let str1 = JSON.stringify([...formValues]);
        str1.replace("[", "");
        alert(str1);
        console.log("formvalues", str1);
        console.log("formvalues", JSON.stringify([...formValues]));
        axios
            .post("http://localhost:3030/input", JSON.stringify(formValues))
            .then((res) => console.log(res))
            .catch((error) => console.log(error))


    }

    return (
        <div className={classes.formContent}>
            <h1>Add a new recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.formInput}>
                    <input type="text" id="id" name="id" size="40" placeholder={uid} defaultValue={uid} hidden></input>
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
                    <input type="text" id="flag" name="flag" size="40" placeholder={flag} defaultValue={flag} hidden onChange={e => handleMainFormChange(e)}></input>
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
                    {formValues.map((element, index) => (

                        <div className="form-inline" key={index}>
                            <label>quantity</label>
                            <input type="text" name="quantity" value={element.quantity || ""} onChange={e => handleChange(index, e)} />
                            <label>ingredients</label>
                            <input type="text" name="ingredients" value={element.ingredients || ""} onChange={e => handleChange(index, e)} />
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