import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChicken, fetchChickens } from '../store/chickensSlice';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
    await dispatch(fetchChickens() as any);
    onCreated && onCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Neue Chicken hinzufügen</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField 
            label="Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField 
            label="Rasse" 
            value={breed} 
            onChange={e => setBreed(e.target.value)} 
            required 
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
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
        </Grid>
        <Grid item xs={12}>
          <Box mt={2}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={<AddIcon />}
            >
              Hinzufügen
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
