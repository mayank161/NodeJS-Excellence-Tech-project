const express = require('express');

const candidateRouter = require('../controller/candidate');

const router = express.Router();

router.post('/candidate',candidateRouter.addCandidate);

router.post('/:candidate/test',candidateRouter.setTest);

router.get('/max',candidateRouter.findMax);

router.get('/avg',candidateRouter.findAvg);

module.exports = router;