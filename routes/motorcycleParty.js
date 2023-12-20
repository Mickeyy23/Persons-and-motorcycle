const express = require('express');
const router = express.Router();

// Sample in-memory storage for motorcycle party (for demonstration purposes)
let motorcycleParty = {
  partyName: "MotoVelesParty",
  location: "Veles",
  date: "2024-05-30",
  attendees: [] // Array to store attendees
};

router.get('/', (req, res) => {
  res.status(200).json(motorcycleParty);
});

router.post('/', (req, res) => {
  const { partyName, location, date } = req.body;

  if (!partyName || !location || !date) {
    return res.status(400).json({ error: 'Please provide all required information for the motorcycle party.' });
  }

  // Save motorcycle party information
  motorcycleParty = {
    partyName,
    location,
    date,
    attendees: [] // Reset attendees list when updating party details
  };

  // Logging the received party data
  console.log('Received Motorcycle Party:', motorcycleParty);

  // Sending back a response
  res.status(200).json({ message: 'Motorcycle party details received successfully.' });
});

router.put('/update', (req, res) => {
  const { partyName, location, date } = req.body;

  if (!partyName || !location || !date) {
    return res.status(400).json({ error: 'Please provide all required information to update the motorcycle party.' });
  }

  // Update motorcycle party information
  motorcycleParty.partyName = partyName;
  motorcycleParty.location = location;
  motorcycleParty.date = date;

  // Logging the updated party data
  console.log('Updated Motorcycle Party:', motorcycleParty);

  // Sending back a response
  res.status(200).json({ message: 'Motorcycle party details updated successfully.' });
});

router.delete('/delete', (req, res) => {
  // Clear motorcycle party details
  motorcycleParty = {
    partyName: "",
    location: "",
    date: "",
    attendees: [] // Empty attendees list
  };

  // Logging the deletion of party data
  console.log('Deleted Motorcycle Party');

  // Sending back a response
  res.status(200).json({ message: 'Motorcycle party details deleted successfully.' });
});

module.exports = router;