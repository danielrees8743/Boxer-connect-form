import Boxer from '../models/boxerModel.js';
import catchAsyncErrors from '../utils/catchAsyncErrors.js';
import { uploadImageToStorage } from '../utils/handleImage.js';

const getAllBoxers = catchAsyncErrors(async (req, res) => {
  const boxers = await Boxer.find();
  res.status(200).json(boxers);
});

const addBoxer = async (req, res) => {
  console.log('Boxer Controller', req.body);
  console.log('Boxer Controller', req.file);

  // use the image that saved in the uploads folder and upload it to cloudinary?
  req.body.picture = await uploadImageToStorage('uploads/' + req.file.filename);

  if (req.body.picture === null) {
    res.status(400).json({
      message: 'Image upload failed',
    });
  }

  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

export default { addBoxer, getAllBoxers };
