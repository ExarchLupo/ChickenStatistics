import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateChicken } from '../store/chickensSlice';
import { ChickenDto } from '../types';
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
  open: boolean;
  onClose: () => void;
}

export const EditChickenForm: React.FC<Props> = ({ chicken, open, onClose }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (chicken) {
      setName(chicken.name);
      setBreed(chicken.breed);
      setDateOfBirth(chicken.dateOfBirth.substring(0, 10)); // Format to YYYY-MM-DD
    }
  }, [chicken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chicken) {
      await dispatch(updateChicken({
        ...chicken,
        name,
        breed,
        dateOfBirth
      }) as any);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Chicken bearbeiten</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Rasse"
              value={breed}
              onChange={e => setBreed(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              type="date"
              label="Geburtsdatum"
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button type="submit" variant="contained" color="primary">Speichern</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
