import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import classes from './SingleRecipe.module.css'

const SingleRecipe = () => {
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
            <div className={classes.middle}>               
                <img src={data.image} alt={data.title} />
                <div className={classes.descript}>
                    <p>{data.Description}</p>
                    <h4>{data.author}</h4>
                </div>
            </div>
            <div className={classes.prep}>
                <div className={classes.preperations}>
                    <h2>Preperation</h2>
                    <p>{data.instructions}</p>
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