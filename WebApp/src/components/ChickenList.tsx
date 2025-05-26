import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ChickenDto } from '../types';
import { fetchChickens } from '../store/chickensSlice';
import { 
  Button, 
  IconButton, 
  Stack, 
  Tooltip, 
  Typography, 
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  CircularProgress
} from '@mui/material';
import WeightChart from './WeightChart';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TimelineIcon from '@mui/icons-material/Timeline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Props {
  onAddWeight: (chicken: ChickenDto) => void;
  onEdit: (chicken: ChickenDto) => void;
}

export const ChickenList: React.FC<Props> = ({ onAddWeight, onEdit }) => {
  const dispatch = useDispatch();
  const chickens = useSelector((state: RootState) => state.chickens.chickens);
  const loading = useSelector((state: RootState) => state.chickens.loading);
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    dispatch(fetchChickens() as any);
  }, [dispatch]);

  const handleExpandRow = (chickenId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chickenId)) {
        newSet.delete(chickenId);
      } else {
        newSet.add(chickenId);
      }
      return newSet;
    });
  };

  const getLatestWeight = (weights: any[]) => {
    if (!Array.isArray(weights) || weights.length === 0) return 'Keine Daten';
    const sorted = weights.filter((w: any) => w && w.date && w.weight !== undefined)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sorted.length === 0) return 'Keine Daten';
    const latest = sorted[0];
    const d = typeof latest.date === 'string' ? new Date(latest.date) : latest.date;
    return `${latest.weight} kg (${isNaN(d.getTime()) ? '' : d.toLocaleDateString()})`;
  };

  const formatDateOfBirth = (dateOfBirth: string) => {
    const date = new Date(dateOfBirth);
    return isNaN(date.getTime()) ? 'Unbekannt' : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Meine Chickens
      </Typography>
      
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(85, 139, 47, 0.1)' }}>
              <TableCell></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Rasse</strong></TableCell>
              <TableCell><strong>Geburtsdatum</strong></TableCell>
              <TableCell><strong>Aktuelles Gewicht</strong></TableCell>
              <TableCell><strong>Aktionen</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chickens.map((chicken) => (
              <React.Fragment key={chicken.id}>
                <TableRow 
                  hover
                  sx={{ 
                    '&:hover': { backgroundColor: 'rgba(85, 139, 47, 0.04)' },
                    cursor: 'pointer'
                  }}
                >
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleExpandRow(chicken.id)}
                      sx={{ color: 'rgba(85, 139, 47, 0.8)' }}
                    >
                      {expandedRows.has(chicken.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell onClick={() => handleExpandRow(chicken.id)}>
                    {chicken.name}
                  </TableCell>
                  <TableCell onClick={() => handleExpandRow(chicken.id)}>
                    {chicken.breed}
                  </TableCell>
                  <TableCell onClick={() => handleExpandRow(chicken.id)}>
                    {formatDateOfBirth(chicken.dateOfBirth)}
                  </TableCell>
                  <TableCell onClick={() => handleExpandRow(chicken.id)}>
                    {getLatestWeight(chicken.weights)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Bearbeiten">
                        <IconButton 
                          size="small" 
                          color="primary" 
                          onClick={() => onEdit(chicken)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Gewichtsverlauf anzeigen">
                        <IconButton 
                          size="small" 
                          color="info" 
                          onClick={() => handleExpandRow(chicken.id)}
                        >
                          <TimelineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Gewicht hinzufügen">
                        <IconButton 
                          size="small" 
                          color="success" 
                          onClick={() => onAddWeight(chicken)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
                
                {/* Expandierbare Zeile für Gewichtsverlauf */}
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedRows.has(chicken.id)} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6" gutterBottom component="div" color="primary">
                          Gewichtsverlauf von {chicken.name}
                        </Typography>
                        {chicken.weights && chicken.weights.length > 0 ? (
                          <Box sx={{ height: 300, mb: 2 }}>
                            <WeightChart weights={chicken.weights} />
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                            Keine Gewichtsdaten verfügbar
                          </Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {chickens.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Keine Chickens gefunden. Fügen Sie welche hinzu!
          </Typography>
        </Box>
      )}
    </Box>
  );
};
