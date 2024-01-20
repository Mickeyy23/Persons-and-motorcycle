const mysql = require('mysql');

const express = require('express');
const bodyParser = require('body-parser');
const personsRouter = require('./routes/persons'); // Importing the persons router
const motorcyclePartyRouter = require('./routes/motorcycleParty'); // Importing the motorcycle party router
const motorcycleRouter = require('./routes/motorcycle'); 
const pool = require('./db/db');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/persons', personsRouter); // Mounting the persons router at /persons endpoint
app.use('/motorcycle-party', motorcyclePartyRouter); // Mounting the motorcycle party router at /motorcycle-party endpoint
app.use('/motorcycles', motorcycleRouter); // Mounting motorcycle router at /motorcycles endpoint

app.get('/', (req, res) => {
    res.send('Welcome to my Node.js application');
  });

app.put('/persons/update', async (req, res) => {
    const { personId, firstName, lastName } = req.body;
      try {
        // Update logic (replace this with your actual update logic)
        // const updatedPerson = await PersonModel.findByIdAndUpdate(personId, { firstName, lastName }, { new: true });

        res.status(200).json({ message: 'Person updated successfully.' });
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Failed to update the person.' });
    }
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

  
// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
