'use strict';

var express = require('express');
var controller = require('./choice.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/poll/:id', controller.showByPollId);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/vote/:id', controller.updateVoteCount);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/poll/:pollId', controller.destroyByPollId);

module.exports = router;