import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChicken, fetchChickens } from '../store/chickensSlice';

interface Props {
  onCreated?: () => void;
}

export const ChickenForm: React.FC<Props> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addChicken({ name, breed, dateOfBirth, weights: [] }) as any);
    setName('');
    setBreed('');
    setDateOfBirth('');
    dispatch(fetchChickens());
    onCreated && onCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Chicken</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Breed" value={breed} onChange={e => setBreed(e.target.value)} required />
      <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
};
