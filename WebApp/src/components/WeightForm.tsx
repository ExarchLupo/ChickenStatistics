import React, { useState } from 'react';
import { ChickenDto } from '../types';
import { API_BASE_URL } from '../api';

interface Props {
  chicken: ChickenDto | null;
  onClose: () => void;
  onWeightAdded: () => void;
}

export const WeightForm: React.FC<Props> = ({ chicken, onClose, onWeightAdded }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');

  if (!chicken) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API_BASE_URL}/chickens/${chicken.id}/weights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weight: parseFloat(weight), date })
    });
    setWeight('');
    setDate('');
    onWeightAdded();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Weight for {chicken.name}</h3>
      <input
        type="number"
        step="0.01"
        placeholder="Weight (kg)"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Weight</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};
