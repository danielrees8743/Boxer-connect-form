import { useFormik } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchClubs, sendBoxerForm } from '../hooks/useFetch';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

export default function BoxerForm() {
  const { data, isLoading, isError } = useQuery(['clubs'], () => fetchClubs());

  const postForm = useMutation(sendBoxerForm);
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState([]);

  const formik = useFormik({
    initialValues: {
      club: '',
      firstName: '',
      lastName: '',
      nickname: '',
      dob: '',
      email: '',
      weight: '',
      height: '',
      stance: '',
      picture: '',
      fitToFight: '',
      licenseNumber: '',
    },

    onSubmit: async (values) => {
      try {
        const data = await postForm.mutateAsync(values);
        Swal.fire({
          title: 'Thank you!',
          text: `Added ${data.boxer.firstName} ${data.boxer.lastName} to the database, thank you for your submission. You will be redirected back to the form, to add another boxer (if you want to). `,
          timer: 6000,
          icon: 'success',
          confirmButtonText: 'Cool 😎',
        });
        setTimeout(() => {
          window.location.reload();
        }, 7000);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Oops!',
          text: `${error}`,
          icon: 'error',
          confirmButtonText: 'TKO 🥊',
        });
      }
    },
  });

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5000000) {
      Swal.fire({
        title: 'Oops!',
        text: `File is too large, please upload a file smaller than 5MB`,
        icon: 'error',
        confirmButtonText: 'TKO 🥊',
      });
      return;
    }

    if (file && file.type !== 'image/jpeg' && file.type !== 'image/png') {
      Swal.fire({
        title: 'Oops!',
        text: `File is not supported, please upload a jpeg or png file`,
        icon: 'error',
        confirmButtonText: 'TKO 🥊',
      });
      return;
    }

    formik.values.picture = file;
    formik.setFieldValue('picture', file);
    setSelectedFile(formik.values.picture.name);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const labelFont = 'text-lg font-medium';
  const select =
    'h-10 w-60 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';

  return (
    <div className='mx-7'>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col items-center'
      >
        <h2 className='text-3xl font-extrabold'>Boxer Submission Form</h2>
        <label className={labelFont} htmlFor='club'>
          Club
        </label>
        <select
          className={select}
          name='club'
          id='club'
          onChange={formik.handleChange}
          value={formik.values.club}
        >
          <option>Select a club</option>
          {isLoading && <option>Loading...</option>}
          {isError && <option>Error</option>}
          {data &&
            data.map((club) => (
              <option key={club._id} value={club._id}>
                {club.name}
              </option>
            ))}
        </select>
        <label className={labelFont} htmlFor='firstName'>
          First Name
        </label>
        <input
          className={select}
          type='text'
          name='firstName'
          id='firstName'
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <label className={labelFont} htmlFor='lastName'>
          Last Name
        </label>
        <input
          className={select}
          type='text'
          name='lastName'
          id='lastName'
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <label className={labelFont} htmlFor='dob'>
          Date of Birth
        </label>
        <input
          className={select}
          type='date'
          name='dob'
          id='dob'
          onChange={formik.handleChange}
          value={formik.values.dob}
        />
        <label className={labelFont} htmlFor='fitToFight'>
          Fit to fight
        </label>
        <select
          className={select}
          name='fitToFight'
          id='fitToFight'
          onChange={formik.handleChange}
          value={formik.values.fitToFight}
        >
          <option value=''>Select if Fit to Fight</option>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </select>
        <label className={labelFont} htmlFor='nickname'>
          Nick Name
        </label>
        <input
          className={select}
          type='text'
          name='nickname'
          id='nickname'
          onChange={formik.handleChange}
          value={formik.values.nickname}
        />
        <label className={labelFont} htmlFor='email'>
          Email
        </label>
        <input
          className={select}
          type='email'
          name='email'
          id='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        {/*------------------------------------------------------*/}
        <label className={labelFont} htmlFor='picture'>
          Picture
        </label>
        <input
          className={select}
          type='file'
          name='picture'
          id='picture'
          onChange={handlePictureChange}
          value={selectedFile.name}
        />
        {previewSource && (
          <div className='m-4 p-2 border-2 border-solid border-blue-400'>
            <img
              src={previewSource}
              alt='preview'
              style={{ width: 250, height: 200 }}
            />
          </div>
        )}
        <label className={labelFont} htmlFor='weight'>
          Weight
        </label>
        <input
          className={select}
          type='number'
          name='weight'
          id='weight'
          onChange={formik.handleChange}
          value={formik.values.weight}
        />
        <label className={labelFont} htmlFor='height'>
          Height
        </label>
        <input
          className={select}
          type='number'
          name='height'
          id='height'
          onChange={formik.handleChange}
          value={formik.values.height}
        />

        <label className={labelFont} htmlFor='stance'>
          Stance
        </label>
        <select
          className={select}
          name='stance'
          id='stance'
          onChange={formik.handleChange}
          value={formik.values.stance}
        >
          <option value=''>Select a stance</option>
          <option value='orthodox'>Orthodox</option>
          <option value='southpaw'>Southpaw</option>
          <option value='switch'>Switch</option>
        </select>

        <label className={labelFont} htmlFor='licenseNumber'>
          License Number
        </label>
        <input
          className={select}
          type='text'
          name='licenseNumber'
          id='licenseNumber'
          onChange={formik.handleChange}
          value={formik.values.licenseNumber}
        />
        <div className='grid place-items-center'>
          <button
            className='border border-solid bg-blue-500 w-40 h-10 rounded-md text-white font-bold hover:bg-blue-700 m-3'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
