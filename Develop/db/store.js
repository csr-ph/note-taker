const util = require('util');
const fs = require('fs');

// npm package for creating ids
const rndid = require('rndid');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class Store {
    read() {
        return readFile('db/notes.json');
    }

    write(note) {
        
    }
}