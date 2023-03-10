import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

const fetchClubs = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/clubs');
  return response.json();
};

export default function Form() {
  const { data, isLoading, isError } = useQuery(['clubs'], fetchClubs());

  console.log(data);

  const {
    handleSubmit,
    sendForm,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <h2>Form</h2>
      <select {...register('club')}>
        <option value=''>Select a club</option>
      </select>
      <input type='text' placeholder='First Name' {...register('first name')} />
      <input type='text' placeholder='Last Name' {...register('last name')} />
      <input type='date' {...register('dob')} />
      <input type='text' placeholder='Email' {...register('email')} />
      <input type='number' placeholder='Weight in KG' {...register('weight')} />
      <input type='number' placeholder='Height in CM' {...register('height')} />
      <select {...register('stance')}>
        <option value='southpaw'>southpaw</option>
        <option value='orthodox'>orthodox</option>
      </select>
      <input type='file' {...register('picture')} />
      <label>
        Fit to fight
        <select value='Fit to fight' {...register('fitToFight')}>
          <option value='true'>yes</option>
          <option value='false'>no</option>
        </select>
      </label>

      <input type='submit' className='button' />
    </form>
  );
}
