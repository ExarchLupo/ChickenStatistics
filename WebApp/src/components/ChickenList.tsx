import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ChickenDto } from '../types';
import { fetchChickens } from '../store/chickensSlice';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import WeightChart from './WeightChart';

interface Props {
  onAddWeight: (chicken: ChickenDto) => void;
}

export const ChickenList: React.FC<Props> = ({ onAddWeight }) => {
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
        <>
          <Button variant="contained" size="small" onClick={() => { setSelectedChicken(params.row); setOpenChart(true); }}>Gewichtsverlauf</Button>
          <Button variant="outlined" size="small" style={{ marginLeft: 8 }} onClick={() => onAddWeight(params.row)}>Gewicht hinzufügen</Button>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <div style={{ width: '100%', height: 500 }}>
      <h2>Chickens</h2>
      <DataGrid
        rows={chickens}
        columns={columns}
        getRowId={row => row.id}
        loading={loading}
        pageSizeOptions={[10, 20, 50]}
        autoHeight
      />
      {selectedChicken && openChart && (
        <div style={{ marginTop: 24 }}>
          <h3>Gewichtsverlauf von {selectedChicken.name}</h3>
          <WeightChart weights={selectedChicken.weights || []} />
          <Button variant="text" onClick={() => setOpenChart(false)}>Schließen</Button>
        </div>
      )}
    </div>
  );
};
