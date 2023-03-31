import Boxer from '../models/boxerModel.js';
import AppError from '../utils/appError.js';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import { uploadImageToStorage } from '../utils/handleImage.js';

const getAllBoxers = catchAsyncErrors(async (req, res) => {
  const boxers = await Boxer.find();
  res.status(200).json(boxers);
});

const addBoxer = catchAsyncErrors(async (req, res, next) => {
  console.log('Boxer Controller', req.body);
  console.log('Boxer Controller', req.file);

  // check if the boxer already exists
  const isboxer = await Boxer.findOne({ email: req.body.email });

  if (isboxer) {
    res.status(400).json({
      message: 'Boxer already exists',
    });
    return next(new AppError('Boxer already exists', 400));
  }

  req.body.picture = await uploadImageToStorage('uploads/' + req.file.filename);

  if (req.body.picture === null) {
    res.status(400).json({
      message: 'Image upload failed',
    });
  }

  const {
    club,
    firstName,
    lastName,
    nickname,
    dob,
    age,
    email,
    weight,
    height,
    stance,
    picture,
    id,
    fights,
    licenseNumber,
    fitToFight,
  } = req.body;

  const boxer = await Boxer.create({
    club,
    firstName,
    lastName,
    nickname,
    dob,
    age,
    email,
    weight,
    height,
    stance,
    picture,
    id,
    fights,
    licenseNumber,
    fitToFight,
  });

  res.status(201).json({
    boxer,
    message: 'Boxer added',
  });
});

export default { addBoxer, getAllBoxers };
