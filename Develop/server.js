// set up dependencies and requirements
const express = require('express');
const app = express();
const { notes } = require('./db/notes');
const path = require('path');
const fs = require('fs');

// create a blank array to store notes
let noteData = [];

// set up middleware for front end
app.use(express.static('public'));

// route for serving notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// route to serve up index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//set up listener for server
app.listen(3001, () => {
    console.log('Now listening on port 3001');
});