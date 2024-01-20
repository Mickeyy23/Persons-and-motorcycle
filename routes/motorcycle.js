const express = require('express');
const router = express.Router();
const pool = require('../db/db');




// GET all motorcycles
router.get('/', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM motorcycle');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to retrieve motorcycle.' });
  }
});

// GET a specific motorcycle by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [motorcycle] = await pool.query('SELECT * FROM motorcycle WHERE id = ?', [id]);
    if (motorcycle.length === 0) {
      return res.status(404).json({ error: 'Motorcycle not found.' });
    }
    res.status(200).json(motorcycle[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to retrieve the motorcycle.' });
  }
});

// POST endpoint to add a new motorcycle
router.post('/add', async (req, res) => {
  const { motorcycle, motorcycleModel, year } = req.body;

  console.log("Received Request Payload:", req.body);

  // Add this log to check the received payload

  if (!motorcycle || !motorcycleModel || !year) {
    return res.status(400).json({ error: 'Please provide all required information for the motorcycle.' });
  }

  try {
    await pool.query('INSERT INTO motorcycle (motorcycle, motorcycleModel, year) VALUES (?, ?, ?)', [motorcycle, motorcycleModel, year]);
    res.status(201).json({ message: 'Motorcycle added successfully.' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to add the motorcycle.' });
  }
});
// PUT endpoint to update a motorcycle by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { motorcycle, motorcycleModel, year } = req.body;

  if (!motorcycle && !motorcycleModel && !year) {
    return res.status(400).json({ error: 'Please provide data to update the motorcycle.' });
  }

  try {
    const [existingMotorcycle] = await pool.query('SELECT * FROM motorcycle WHERE id = ?', [id]);
    if (existingMotorcycle.length === 0) {
      return res.status(404).json({ error: 'Motorcycle not found.' });
    }

    await pool.query('UPDATE motorcycle SET motorcycle = ?, motorcycleModel = ?, year = ? WHERE id = ?', [motorcycle, motorcycleModel, year, id]);
    res.status(200).json({ message: 'Motorcycle details updated successfully.' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to update the motorcycle.' });
  }
});

// DELETE endpoint to remove a motorcycle by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [existingMotorcycle] = await pool.query('SELECT * FROM motorcycle WHERE id = ?', [id]);
    if (existingMotorcycle.length === 0) {
      return res.status(404).json({ error: 'Motorcycle not found.' });
    }

    await pool.query('DELETE FROM motorcycle WHERE id = ?', [id]);
    res.status(200).json({ message: 'Motorcycle deleted successfully.' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Failed to delete the motorcycle.' });
  }
});



module.exports = router;