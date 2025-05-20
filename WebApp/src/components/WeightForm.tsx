import React, { useState } from 'react';
import { ChickenDto } from '../types';
import { API_BASE_URL } from '../api';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

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
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Gewicht für {chicken.name} hinzufügen</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>            <TextField
              type="number"
              label="Gewicht (kg)"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              fullWidth
              required
              variant="outlined"
              inputProps={{ step: "0.01" }}
            />
            <TextField
              type="date"
              label="Datum"
              value={date}
              onChange={e => setDate(e.target.value)}
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button type="submit" variant="contained" color="primary">Hinzufügen</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
