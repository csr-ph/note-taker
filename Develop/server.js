// set up dependencies and requirements
const express = require('express');
const app = express();
const { notes } = require('./db/db');
const path = require('path');
const fs = require('fs');

// create a blank array to store notes
let noteData = [];

// set up middleware for app usage
app.use(express.static('public'));

//set up listener for server
app.listen(3001, () => {
    console.log('Now listening on port 3001');
});