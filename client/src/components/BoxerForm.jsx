import { useFormik } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchClubs, sendBoxerForm } from '../hooks/useFetch';
import { useState } from 'react';
import Swal from 'sweetalert2';

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
          text: `Added ${data.boxer.firstName} ${data.boxer.lastName} to the database, thank you for your submission. You will be redirected back to the form, to add another boxer. `,
          timer: 6000,
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Oops!',
          text: `${error.message}`,
          icon: 'error',
          confirmButtonText: 'TKO 🥊',
        });
      }
    },
  });

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
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

  return (
    <form onSubmit={formik.handleSubmit} className='form'>
      <h2>Boxer Submission Form</h2>
      <label htmlFor='club'>Club</label>
      <select
        name='club'
        id='club'
        onChange={formik.handleChange}
        value={formik.values.club}
      >
        <option value=''>Select a club</option>
        {isLoading && <option>Loading...</option>}
        {isError && <option>Error</option>}
        {data &&
          data.map((club) => (
            <option key={club._id} value={club._id}>
              {club.name}
            </option>
          ))}
      </select>
      <label htmlFor='firstName'>First Name</label>
      <input
        type='text'
        name='firstName'
        id='firstName'
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor='lastName'>Last Name</label>
      <input
        type='text'
        name='lastName'
        id='lastName'
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor='dob'>Date of Birth</label>
      <input
        type='date'
        name='dob'
        id='dob'
        onChange={formik.handleChange}
        value={formik.values.dob}
      />
      <label htmlFor='fitToFight'>Fit to fight</label>
      <select
        name='fitToFight'
        id='fitToFight'
        onChange={formik.handleChange}
        value={formik.values.fitToFight}
      >
        <option value=''>Select if Fit to Fight</option>
        <option value='true'>Yes</option>
        <option value='false'>No</option>
      </select>
      <label htmlFor='nickname'>Nick Name</label>
      <input
        type='text'
        name='nickname'
        id='nickname'
        onChange={formik.handleChange}
        value={formik.values.nickname}
      />
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        name='email'
        id='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {/*------------------------------------------------------*/}
      <label htmlFor='picture'>Picture</label>
      <input
        type='file'
        name='picture'
        id='picture'
        onChange={handlePictureChange}
        value={selectedFile.name}
      />
      {previewSource && (
        <img
          src={previewSource}
          alt='preview'
          style={{ width: 200, height: 200 }}
        />
      )}
      <label htmlFor='weight'>Weight</label>
      <input
        type='number'
        name='weight'
        id='weight'
        onChange={formik.handleChange}
        value={formik.values.weight}
      />
      <label htmlFor='height'>Height</label>
      <input
        type='number'
        name='height'
        id='height'
        onChange={formik.handleChange}
        value={formik.values.height}
      />

      <label htmlFor='stance'>Stance</label>
      <select
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

      <label htmlFor='licenseNumber'>License Number</label>
      <input
        type='text'
        name='licenseNumber'
        id='licenseNumber'
        onChange={formik.handleChange}
        value={formik.values.licenseNumber}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
