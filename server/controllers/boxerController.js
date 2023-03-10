import Boxer from '../models/boxerModel.js';

const getAllBoxers = async (req, res) => {
  try {
    const boxers = await Boxer.find();
    res.status(200).json(boxers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBoxer = async (req, res) => {
  const {
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
  try {
    const boxer = await Boxer.create({
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
    console.log(boxer);
    res.status(201).json({ message: 'Boxer added' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default { addBoxer, getAllBoxers };
