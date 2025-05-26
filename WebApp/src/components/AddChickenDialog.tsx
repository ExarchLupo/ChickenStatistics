import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChicken, fetchChickens } from '../store/chickensSlice';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField, 
  Button, 
  Grid, 
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddChickenDialog: React.FC<Props> = ({ open, onClose }) => {
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
    await dispatch(fetchChickens() as any);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setBreed('');
    setDateOfBirth('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Neue Chicken hinzufügen</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
            <TextField 
              label="Name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              fullWidth
              variant="outlined"
              autoFocus
            />
            <TextField 
              label="Rasse" 
              value={breed} 
              onChange={e => setBreed(e.target.value)} 
              required 
              fullWidth
              variant="outlined"
            />
            <TextField 
              type="date" 
              label="Geburtsdatum" 
              value={dateOfBirth} 
              onChange={e => setDateOfBirth(e.target.value)} 
              required 
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
          >
            Hinzufügen
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
