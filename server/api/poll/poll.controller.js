'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  //Poll.find({"user_id" : require('mongoose').Types.ObjectId("562314f32b8bed5928912ab2")}, function (err, polls) {
  // Poll.find({"user_id" : require('mongoose').Types.ObjectId(req.params.used)}, function (err, polls) {
 // Poll.find({"_id":"5621d50f007fd61877128002"}, function (err, polls) {
    //if(err) { return handleError(res, err); }
    return res.json(req.param);
   // return res.status(200).json(polls);
  //});
};

// Get a single poll
exports.show = function(req, res) {
  /*
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    return res.json(poll);
    require('mongoose').Types.ObjectId(req.params.id)
  });
  */
  Poll.find({"user_id" : require('mongoose').Types.ObjectId(req.params.id)}, function (err, polls) {
  //Poll.find({"user_id" : require('mongoose').Types.ObjectId("562314f32b8bed5928912ab2")}, function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.json(polls);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}