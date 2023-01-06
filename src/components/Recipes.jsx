import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Card from './Card';
import classes from './Recipes.module.css'

const Recipes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/all')
            .then(
                (res) => setData(res.data));
    }, []);

    // const reciptList = data.map((recipe) => {
    //     return (
    //         <Card
    //             flag={recipe.flag}
    //             image={recipe.image}
    //             title={recipe.title}
    //         />
    //     );
    // });

    return (
        <div className={classes.recipe_content}>
           <p>Serch for a recipe</p> 
           <input type="text" size={40} />
            <h2>Our recipes</h2>
           <div className={classes.recipes}>
           <select name="country" id="country  ">

                {data.map((recipe) => (
                    <option value={recipe.name} key={recipe.name}>{recipe.name}</option>
                ))}

            </select>        
           </div>
        </div>
    );
};

export default Recipes;