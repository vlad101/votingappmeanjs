'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChoiceSchema = new Schema({
  poll_id: { type: Schema.Types.ObjectId},
  choice_text: {
            type: String,
            required: true
  },
  vote_count: {
            type: Number,
            default: 0
  },
  active: Boolean
});

module.exports = mongoose.model('Choice', ChoiceSchema);