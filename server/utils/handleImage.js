import cloudinary from '../config/cloudinaryConfig.js';
import fs from 'fs';

console.log(process.env.CLOUDINARY_CLOUD_NAME);
export const uploadImageToStorage = async (file) => {
  console.log('UploadImage', file);
  try {
    const response = cloudinary.v2.uploader.upload(file, {
      resource_type: 'auto',
      folder: 'Boxer-connect',
      unique_filename: false,
    });

    if (await response) {
      fs.unlink(`${file}`, (err) => {
        if (err) throw err;
        console.log('Image successfully deleted!');
      });
    }

    console.log('UploadImage', await response);

    return response ? (await response).secure_url : null;
  } catch (error) {
    console.error(error);
  }
};
