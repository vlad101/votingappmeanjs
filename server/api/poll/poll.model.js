'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId},
  question: {
            type: String,
            required: true
  },
  created: {
            type: Date,
            default: Date.now
  },
  active: Boolean
});

module.exports = mongoose.model('Poll', PollSchema);