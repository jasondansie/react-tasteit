import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import classes from './Recipes.module.css'

const Recipes = () => {
    const [data, setData] = useState([]);
    const [recipeList, setRecipeList] = useState([]);
    const [search, setSearch] = useState({
        string: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3030/all')
            .then(
                (res) => {
                    setData(res.data.result);
                    setRecipeList(res.data.result);
                });
                
    }, []);     

    const searchHandler = (e) => {
        setSearch({
            string: e.target.value,
        });

        let foundRecipe = data.filter(recipe => 
            recipe.name.toLowerCase().includes(search.string.toLowerCase()));         
             setRecipeList(foundRecipe);     
    }

    const dispalyRecipe = () =>{
        console.log("recipeList", recipeList);
        return recipeList.map((card) => (
            <Card
            key={card.id}
            flag={card.flag}
            image={card.image}
            title={card.name}
            link={`/SingleRecipe/${card.id}`}
            />
        ))
    }

    return (
        <div className={classes.recipes} >
                <h1>Our Recipes</h1>
                <div className={classes.search}>
                    <label htmlFor="search">Search: </label>
                    <input onChange={(e) => searchHandler(e)} name="search"></input>
                </div>              
                <div className={classes.cards}>
                    {dispalyRecipe()}
                </div>
            </div>
    );
};


export default Recipes;