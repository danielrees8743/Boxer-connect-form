import Boxer from '../models/boxerModel.js';

export const addBoxer = async (req, res) => {
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
    res.status(201).json({ message: 'Boxer added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { addBoxer };
