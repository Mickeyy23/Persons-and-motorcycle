const express = require('express');
const router = express.Router();

const personsRouter = require('./routes/persons');
const motorcyclePartyRouter = require('./routes/motorcycleParty');

router.use('/persons', personsRouter);
router.use('/motorcycle-party', motorcyclePartyRouter);
router.use('/motorcycles', motorcycleRouter);

module.exports = router;