import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your club name'],
  },
  division: {
    type: String,
    required: [true, 'Please enter your division'],
    unique: true,
  },
  clubId: {
    type: String,
    required: [true, 'Please enter your club ID'],
    unique: true,
  },
  contactEmail: {
    type: String,
    required: [true, 'Please enter your contact email'],
    unique: true,
  },
  contactName: {
    type: String,
    required: [true, 'Please enter your contact name'],
  },
});

export default mongoose.model('Club', clubSchema);
