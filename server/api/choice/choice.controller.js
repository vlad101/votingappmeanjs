'use strict';

var _ = require('lodash');
var Choice = require('./choice.model');

// Get list of choices
exports.index = function(req, res) {
  Choice.find(function (err, choices) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(choices);
  });
};

// Get a single choice
exports.showByPollId = function(req, res) {
  Choice.find({"poll_id" : require('mongoose').Types.ObjectId(req.params.id)}, function (err, choice) {
    if(err) { return handleError(res, err); }
    if(!choice) { return res.status(404).send('Not Found'); }
    return res.json(choice);
  });
};

// Get a single choice
exports.show = function(req, res) {
  Choice.findById(req.params.id, function (err, choice) {
    if(err) { return handleError(res, err); }
    if(!choice) { return res.status(404).send('Not Found'); }
    return res.json(choice);
  });
};

// Creates a new choice in the DB.
exports.create = function(req, res) {
  Choice.create(req.body, function(err, choice) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(choice);
  });
};

// Updates an existing choice in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Choice.findById(req.params.id, function (err, choice) {
    if (err) { return handleError(res, err); }
    if(!choice) { return res.status(404).send('Not Found'); }
    var updated = _.merge(choice, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(choice);
    });
  });
};

// Updates an existing choice vote count by one in the DB.
exports.updateVoteCount = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Choice.findById(req.params.id, function (err, choice) {
    if (err) { return handleError(res, err); }
    if(!choice) { return res.status(404).send('Not Found'); }
    choice.vote_count++;
    choice.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(choice);
    });
  });
};

// Deletes a choice from the DB.
exports.destroy = function(req, res) {
  Choice.findById(req.params.id, function (err, choice) {
    if(err) { return handleError(res, err); }
    if(!choice) { return res.status(404).send('Not Found'); }
    choice.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Deletes a choice by poll id from the DB.
exports.destroyByPollId = function(req, res) {
  Choice.find({poll_id:req.params.pollId}, function (err, choices) {
    if(err) { return handleError(res, err); }
    if(!choices) { return res.status(404).send('Not Found'); }
  }).remove( function (err) {
      if(err) { return handleError(res, err); }
    }).exec( function (err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}