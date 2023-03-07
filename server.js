const express = require('express');

const cors = require('cors');
const severless = require('serverless-http');

const app = express();
const port = 3040



const { getAllRecipes, getRecipe, addToStorage } = require('./storage/recipeStorage');

app.use(cors());
app.use(express.json());
app.use(require('body-parser').urlencoded({ extended: false }));

app.get('/recipes', (req, res) => {
  res.send(getAllRecipes())
})

app.get('/getSingleRecipe/:id', (req, res) => {

    let result = getRecipe('id', Number(req.params.id));
    res.send(result)
  })

app.post('/input', (req, res) => {
    let result = addToStorage(req.body);
    res.send(result) 
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

module.exports.handler = severless(app);