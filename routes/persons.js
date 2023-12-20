const express = require('express');
const router = express.Router();
const pool = require('../db/db');

const name = '';
console.log(name);

// Sample in-memory storage for persons (for demonstration purposes)
const persons = [];

// GET endpoint to retrieve all persons
router.get('/', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM persons');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to retrieve persons.' });
  }
});


router.post('/', async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Please provide all required information for the person.' });
  }

  try {
    await pool.query('INSERT INTO persons (firstName, lastName) VALUES (?, ?)', [firstName, lastName]);
    res.status(201).json({ message: 'Person added successfully.' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to add a new person.' });
  }

  let existingPerson = persons.find(person => person.name === name && person.lastName === lastName);

  if (existingPerson) {
    
    // Update motorcycle details and type for the existing person
  } else {
    // Create a new person entry with motorcycle details and type
    const newPerson = {
      firstName,
      lastName,
      
    };
    persons.push(newPerson);
  }

  // Logging the updated/received person data
  console.log('Received/Updated Person:', existingPerson || req.body);


});

router.post('/:personId/motorcycles', async (req, res) => {
  const { personId } = req.params;
  const { motorcycleBrand, motorcycleModel, year } = req.body;

  if (!motorcycleBrand || !motorcycleModel || !year) {
    return res.status(400).json({ error: 'Please provide all required information for the motorcycle.' });
  }

  try {
    // Check if the person exists
    const [person] = await pool.query('SELECT * FROM persons WHERE id = ?', [personId]);
    if (person.length === 0) {
      return res.status(404).json({ error: 'Person not found.' });
    }

    // Add the motorcycle for the specific person
    await pool.query(
      'INSERT INTO motorcycles (personId, motorcycleBrand, motorcycleModel, year) VALUES (?, ?, ?, ?)',
      [personId, motorcycleBrand, motorcycleModel, year]
    );

    res.status(201).json({ message: 'Motorcycle added successfully for the person.' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to add a motorcycle for the person.' });
  }
});

// PUT endpoint to update a person
router.put('/:personId', async (req, res) => {
  const { personId } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Please provide all required information for the person update.' });
  }

  try {
    const [person] = await pool.query('SELECT * FROM persons WHERE id = ?', [personId]);
    if (person.length === 0) {
      return res.status(404).json({ error: 'Person not found.' });
    }

    await pool.query('UPDATE persons SET firstName = ?, lastName = ? WHERE id = ?', [firstName, lastName, personId]);
    res.status(200).json({ message: 'Person updated successfully.' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to update the person.' });
  }
});

// DELETE endpoint to delete a person
router.delete('/:personId', async (req, res) => {
  const { personId } = req.params;

  try {
    const [person] = await pool.query('SELECT * FROM persons WHERE id = ?', [personId]);
    if (person.length === 0) {
      return res.status(404).json({ error: 'Person not found.' });
    }

    await pool.query('DELETE FROM persons WHERE id = ?', [personId]);
    res.status(200).json({ message: 'Person deleted successfully.' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to delete the person.' });
  }
});

module.exports = router;
