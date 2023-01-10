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
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const menuPath = path.join(__dirname, 'http://localhost:3000');

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

app.post('/input', (req, res) => {
    if (!req.body) return res.statusCode(500);

    console.log("calling input with:", JSON.parse(JSON.stringify(req.body)));
    
    dataStorage.insert(req.body)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error))
})

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