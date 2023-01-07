import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import classes from './SingleRecipe.module.css'

const SingleRecipe = () => {
    const {recipe, setRecipe} = useState([]);
    const [data, setData] = useState([]);
    const params = useParams();

    useEffect(() => {
        
        axios.get(`http://localhost:3030/getSingleRecipe/${params.id}`)
            .then(
                (res) => {
                    setData(res.data.result);
                    console.log("results",res.data.result);
                });
    }, [params.id]);

    return (
        <div className={classes.singleRecipe}>
            <h1>{data.name}</h1>
            <div>
                <h4>{data.Description}</h4>
                <h4>{data.author}</h4>
                <img src={data.image} alt={data.title} />
            </div>
            <div className={classes.section}>
                <div className={classes.preperations}>
                    <h2>Preperation</h2>
                    <h4>{data.instructions}</h4>
                </div>
                <div className={classes.ingredients}>
                <h2>Ingredients</h2>
                    <h4>{data.ingredients}</h4>
                </div>
            </div>
        </div>
    );
};

export default SingleRecipe;