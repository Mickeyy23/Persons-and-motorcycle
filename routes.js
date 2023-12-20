const express = require('express');
const router = express.Router();

const personsRouter = require('./routes/persons');
const motorcyclePartyRouter = require('./routes/motorcycleParty');
const personsMotorcycle = require('./routes/persons');

router.use('/persons', personsRouter);
router.use('/motorcycle-party', motorcyclePartyRouter);
router.use('/motorcycles', motorcycleRouter);
router.use('/persons/motorcycle', personsMotorcycle);

module.exports = router;