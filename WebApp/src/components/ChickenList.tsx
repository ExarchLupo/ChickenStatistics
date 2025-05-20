import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ChickenDto } from '../types';
import { fetchChickens } from '../store/chickensSlice';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { 
  Button, 
  IconButton, 
  Stack, 
  Tooltip, 
  Typography, 
  Box,
  Paper
} from '@mui/material';
import WeightChart from './WeightChart';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TimelineIcon from '@mui/icons-material/Timeline';

interface Props {
  onAddWeight: (chicken: ChickenDto) => void;
  onEdit: (chicken: ChickenDto) => void;
}

export const ChickenList: React.FC<Props> = ({ onAddWeight, onEdit }) => {
  const dispatch = useDispatch();
  const chickens = useSelector((state: RootState) => state.chickens.chickens);
  const loading = useSelector((state: RootState) => state.chickens.loading);
  const [selectedChicken, setSelectedChicken] = React.useState<ChickenDto | null>(null);
  const [openChart, setOpenChart] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchChickens() as any);
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'breed', headerName: 'Rasse', flex: 1 },
    { field: 'dateOfBirth', headerName: 'Geburtsdatum', flex: 1, valueGetter: (params: any) => {
      const date = params && (params.row ?? params);
      if (!date) return '';
      const d = typeof date === 'string' ? new Date(date) : date;
      return isNaN(d.getTime()) ? '' : d.toLocaleDateString();
    } },
    { field: 'weights', headerName: 'Aktuelles Gewicht (kg)', flex: 1, valueGetter: (params: any) => {
      const weights = params && (params.row ?? params);
      if (!Array.isArray(weights) || weights.length === 0) return '';
      const sorted = weights.filter((w: any) => w && w.date && w.weight !== undefined)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (sorted.length === 0) return '';
      const latest = sorted[0];
      const d = typeof latest.date === 'string' ? new Date(latest.date) : latest.date;
      return `${latest.weight} (${isNaN(d.getTime()) ? '' : d.toLocaleDateString()})`;
    } },
    {
      field: 'actions',
      headerName: 'Aktionen',
      flex: 1,
      renderCell: (params: any) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Bearbeiten">
            <IconButton 
              size="small" 
              color="primary" 
              onClick={() => onEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gewichtsverlauf anzeigen">
            <IconButton 
              size="small" 
              color="info" 
              onClick={() => { setSelectedChicken(params.row); setOpenChart(true); }}
            >
              <TimelineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gewicht hinzufügen">
            <IconButton 
              size="small" 
              color="success" 
              onClick={() => onAddWeight(params.row)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Chicken Übersicht
      </Typography>
      <DataGrid
        rows={chickens}
        columns={columns}
        getRowId={row => row.id}
        loading={loading}
        pageSizeOptions={[10, 20, 50]}
        autoHeight
        sx={{
          '& .MuiDataGrid-cell:hover': {
            backgroundColor: 'rgba(85, 139, 47, 0.04)',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(85, 139, 47, 0.08)',
          },
          mb: 4
        }}
      />
      
      {selectedChicken && openChart && (
        <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Gewichtsverlauf von {selectedChicken.name}
          </Typography>
          <WeightChart weights={selectedChicken.weights || []} />
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button 
              variant="outlined" 
              onClick={() => setOpenChart(false)}
              sx={{ mt: 2 }}
            >
              Schließen
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
