import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ChickenDto } from '../types';
import { fetchChickens } from '../store/chickensSlice';

interface Props {
  onAddWeight: (chicken: ChickenDto) => void;
}

export const ChickenList: React.FC<Props> = ({ onAddWeight }) => {
  const dispatch = useDispatch();
  const chickens = useSelector((state: RootState) => state.chickens.chickens);
  const loading = useSelector((state: RootState) => state.chickens.loading);

  React.useEffect(() => {
    dispatch(fetchChickens());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Chickens</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Date of Birth</th>
            <th>Weights (kg)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chickens.map(chicken => (
            <tr key={chicken.id}>
              <td>{chicken.name}</td>
              <td>{chicken.breed}</td>
              <td>{new Date(chicken.dateOfBirth).toLocaleDateString()}</td>
              <td>
                {chicken.weights?.map(w => `${w.weight} (${new Date(w.date).toLocaleDateString()})`).join(', ')}
              </td>
              <td>
                <button onClick={() => onAddWeight(chicken)}>Add Weight</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
