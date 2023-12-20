const mysql = require('mysql');

const express = require('express');
const bodyParser = require('body-parser');
const personsRouter = require('./routes/persons'); // Importing the persons router
const motorcyclePartyRouter = require('./routes/motorcycleParty'); // Importing the motorcycle party router
const motorcycleRouter = require('./routes/motorcycle'); 
const pool = require('./db/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/persons', personsRouter); // Mounting the persons router at /persons endpoint
app.use('/motorcycle-party', motorcyclePartyRouter); // Mounting the motorcycle party router at /motorcycle-party endpoint
app.use('/motorcycles', motorcycleRouter); // Mounting motorcycle router at /motorcycles endpoint

app.get('/', (req, res) => {
    res.send('Welcome to my Node.js application');
  });

  
// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});