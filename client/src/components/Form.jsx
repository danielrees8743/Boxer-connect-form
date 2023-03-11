import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchClubs, sendBoxerForm } from '../hooks/useFetch';

export default function Form() {
  const { data, isLoading, isError } = useQuery(['clubs'], () => fetchClubs());
  const postForm = useMutation(sendBoxerForm);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    postForm.mutate(data, {
      onSuccess: () => {
        console.log('success');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <h2>Boxer Submission Form</h2>
      <select {...register('club')}>
        <option>Select Club</option>
        {isLoading && <option>Loading...</option>}
        {isError && <option>Error</option>}
        {data?.map((club) => (
          <option key={club._id} value={club._id}>
            {club.name}
          </option>
        ))}
      </select>
      <input type='text' placeholder='First Name' {...register('firstName')} />
      <input type='text' placeholder='Last Name' {...register('lastName')} />
      <input type='text' placeholder='Nickname' {...register('nickname')} />
      <input type='date' {...register('dob')} />
      <input type='text' placeholder='Email' {...register('email')} />
      <input type='number' placeholder='Weight in KG' {...register('weight')} />
      <input type='number' placeholder='Height in CM' {...register('height')} />
      <select {...register('stance')}>
        Stance
        <option value='southpaw'>southpaw</option>
        <option value='orthodox'>orthodox</option>
      </select>
      <input type='file' {...register('picture')} />
      <label>Fit to fight</label>
      <select {...register('fitToFight')}>
        <option value='true'>yes</option>
        <option value='false'>no</option>
      </select>
      <input
        type='text'
        placeholder='license number'
        {...register('licenseNumber')}
      />

      <input type='submit' className='button' />
    </form>
  );
}
