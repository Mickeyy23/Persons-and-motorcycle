const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample in-memory storage for persons and motorcycle party (for demonstration purposes)
const persons = [];
let motorcycleParty = {
  partyName: "MotoVelesParty",
  location: "Veles",
  date: "2024-05-30",
  attendees: [] // Array to store attendees
};

// POST endpoint to handle adding persons to the motorcycle party
app.post('/motorcycle-party/add-person', (req, res) => {
  const { name, lastName, motorcycle, year } = req.body;

  if (!name || !lastName || !motorcycle || !year) {
    return res.status(400).json({ error: 'Please provide all required information for the person.' });
  }

  const newPerson = {
    name,
    lastName,
    motorcycle,
    year
  };

  // Add the person to the attendees list
  motorcycleParty.attendees.push(newPerson);

  // Sending back a response
  res.status(200).json({ message: 'Person added to the motorcycle party successfully.' });
});

// POST endpoint to handle person's information including motorcycle details and motorcycle type
app.post('/person', (req, res) => {
  const { name, lastName, motorcycle, year, motorcycleType } = req.body;

  if (!name || !lastName || !motorcycle || !year || !motorcycleType) {
    return res.status(400).json({ error: 'Please provide all required information for the person.' });
  }

  let existingPerson = persons.find(person => person.name === name && person.lastName === lastName);

  if (existingPerson) {
    existingPerson.motorcycle = motorcycle;
    existingPerson.year = year;
    existingPerson.motorcycleType = motorcycleType;
    // Update motorcycle details and type for the existing person
  } else {
    // Create a new person entry with motorcycle details and type
    const newPerson = {
      name,
      lastName,
      motorcycle,
      year,
      motorcycleType
    };
    persons.push(newPerson);
  }

  // Logging the updated/received person data
  console.log('Received/Updated Person:', existingPerson || req.body);

  // Sending back a response
  res.status(200).json({ message: 'Person details received/updated successfully.' });
});

// POST endpoint to handle motorcycle party information
app.post('/motorcycle-party', (req, res) => {
  const { partyName, location, date } = req.body;

  if (!partyName || !location || !date) {
    return res.status(400).json({ error: 'Please provide all required information for the motorcycle party.' });
  }

  // Save motorcycle party information
  motorcycleParty = {
    partyName,
    location,
    date
  };

  // Logging the received party data
  console.log('Received Motorcycle Party:', motorcycleParty);

  // Sending back a response
  res.status(200).json({ message: 'Motorcycle party details received successfully.' });
});

// GET endpoint to retrieve all persons
app.get('/persons', (req, res) => {
  res.status(200).json(persons);
});

// GET endpoint to retrieve motorcycle party information
app.get('/motorcycle-party', (req, res) => {
  res.status(200).json(motorcycleParty);
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
