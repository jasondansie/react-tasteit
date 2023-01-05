import React from 'react';

const AddNewRecipe = () => {
    return (
        <div>
            <h1>Add a new recipe</h1>
            <form action="localhost:3030/input" method='post'>
            <div>
                <label>Email: </label>
                <input type="text" id="email" name="email"></input>
            </div>
            <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
};

export default AddNewRecipe;