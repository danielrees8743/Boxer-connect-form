import mongoose, { Schema } from 'mongoose';

const boxerSchema = new Schema({
  club: {
    type: Schema.Types.ObjectId,
    ref: 'Club',
    required: [true, 'Please enter your club'],
  },
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  nickname: {
    type: String,
  },
  dob: {
    type: Date,
    required: [true, 'Please enter your date of birth'],
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  weight: {
    type: Number,
    required: [true, 'Please enter your weight in kg'],
  },
  height: {
    type: Number,
    required: [true, 'Please enter your height in cm'],
  },
  stance: {
    type: String,
    required: [true, 'Please enter your stance, either orthodox or southpaw'],
  },
  picture: {
    type: String,
  },
  id: {
    type: String,
  },
  fights: {
    type: Schema.Types.ObjectId,
    ref: 'Fights',
    required: false,
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please enter your license number'],
  },
  fitToFight: {
    type: Boolean,
    required: [true, 'Please enter if you are fit to fight'],
  },
});

export default mongoose.model('Boxer', boxerSchema);
