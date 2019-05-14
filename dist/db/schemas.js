const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

exports.Event = new Schema({
  id:  ObjectId,
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  images: { type: Object, default: {} },
  startTime: { type: Date, default: new Date() },
  endTime: { type: Date, default: new Date() },
  location: { type: Object, default: {} },
  keywords: { type: [String], default: [] },
  sync: { type: String, default: '', index: true },
  timestamp: { type: Number, default: 0 }
});

exports.Story = new Schema({
  id: ObjectId,
  eventId: Number,
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  images: { type: Object, default: {} },
  sync: { type: String, default: '', index: true },
  timestamp: { type: Number, default: 0 }
});
