const mongoose = require('mongoose');

const engineerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [{ type: String }],
  seniority: { type: String, required: true },
  maxCapacity: { type: Number, required: true },
  currentAllocation: { type: Number, required: true },
});

module.exports = mongoose.model('Engineer', engineerSchema);