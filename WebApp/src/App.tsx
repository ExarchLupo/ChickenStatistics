import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { ChickenList } from './components/ChickenList';
import { AddChickenDialog } from './components/AddChickenDialog';
import { WeightForm } from './components/WeightForm';
import { EditChickenForm } from './components/EditChickenForm';
import { ChickenDto } from './types';
import { 
  Container, 
  Box, 
  Paper, 
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#558b2f',  // Green shade for chicken theme
    },
    secondary: {
      main: '#ff8f00',  // Orange/amber for contrast
    },
    background: {
      default: '#f5f5f5',
    }
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
  },
});

const App: React.FC = () => {
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedChicken, setSelectedChicken] = useState<ChickenDto | null>(null);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chicken Statistics
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              sx={{ mb: 4, textAlign: 'center' }}
            >
              Chicken Statistics
            </Typography>
            
            <Paper elevation={3} sx={{ p: 3 }}>
              <ChickenList
                onAddWeight={chicken => {
                  setSelectedChicken(chicken);
                  setShowWeightForm(true);
                }}
                onEdit={chicken => {
                  setSelectedChicken(chicken);
                  setShowEditForm(true);
                }}
              />
            </Paper>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setShowAddDialog(true)}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                Neue Chicken hinzufügen
              </Button>
            </Box>
            
            {showWeightForm && (
              <WeightForm
                chicken={selectedChicken}
                onClose={() => setShowWeightForm(false)}
                onWeightAdded={() => setShowWeightForm(false)}
              />
            )}
            
            <EditChickenForm
              chicken={selectedChicken}
              open={showEditForm}
              onClose={() => setShowEditForm(false)}
            />
              <AddChickenDialog
              open={showAddDialog}
              onClose={() => setShowAddDialog(false)}
            />
            
            {/* Floating Action Button als Alternative */}
            <Fab 
              color="primary" 
              aria-label="add chicken"
              sx={{ 
                position: 'fixed', 
                bottom: 16, 
                right: 16 
              }}
              onClick={() => setShowAddDialog(true)}
            >
              <AddIcon />
            </Fab>
          </Box>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
