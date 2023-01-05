'use strict';

const path = require('path');

const express = require('express');

const cors = require('cors');

const app = express();

const { port, host, storage } = require('./serverConfig.json');

const Datastorage = require(path.join(__dirname, storage.storageFolder, storage.dataLayer));

const dataStorage = new Datastorage();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const menuPath = path.join(__dirname, '/public/index.html');

app.get('/', (req, res) => res.sendFile(menuPath));

app.get('/all', (req, res) =>
    dataStorage.getAll()
    .then(data => res.json({result:data}))
    .catch(error => sendErroPage(res, error))
);

app.get('/getSingleRecipe/:id', (req, res) =>{
    dataStorage.getOne(req.params.id)
    .then(data => res.json({result:data}))
    .catch(error => sendErroPage(res, error))
});

app.get('/inputForm', (req, res) =>  
res.render('form', {
    title: "Add recipe",
    header1: "Add a new recipe",
    action: "/input",
    number: {value: "", readonly: ""},
    name: {value: "", readonly: ""},
    quantity: {value: "", readonly: ""},
    rating: {value: "", readonly: ""},
    genre: {value: "", readonly: ""},
})
);

app.post('/input', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.insert(req.body)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error))
})

app.get('/updateForm', (req, res) =>  
res.render('form', {
    title: "Update recipe",
    header1: "Update recipe data",
    action: "/updateData",
    number: {value: "", readonly: ""},
    name: {value: "", readonly: "readonly"},
    quantity: {value: "", readonly: "readonly"},
    rating: {value: "", readonly: "readonly"},
    genre: {value: "", readonly: "readonly"},
})
);

app.post('/updateData', (req, res) => {
    if(!req.body) return res.sendStatus(500);

    dataStorage.getOne(req.body.number)
    .then(game => 
        res.render('form', {
            title: "Update recipe",
            header1: "Update game recipe",
            action: "/update",
            number: {value: game.number, readonly: "readonly"},
            name: {value: game.name, readonly: ""},
            quantity: {value: game.quantity, readonly: ""},
            rating: {value: game.rating, readonly: ""},
            genre: {value: game.genre, readonly: ""},
        }))
    .catch(error => sendErroPage(res, error));
});

app.post('/update', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.update(req.body)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error))
});

app.get('/removeRecipe', (req, res) => 
    res.render('getSingleRecipe',{
        title: 'Remove',
        header1:'Remove',
        action:'/removeRecipe'
    })
);

app.post('/removeRecipe', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    dataStorage.remove(req.body.id)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error));
});

app.listen(port, host, () => console.log(`Server running on port ${port} on ${host}`));

const sendErroPage = (res, error, title='Error Page', header1='Error status') => {
    sendStatusPage(res, error, title, header1);
}

const sendStatusPage = (res, status, title='Status', header1='Status') => {
    return res.render('statusPage', {title, header1, status});
}