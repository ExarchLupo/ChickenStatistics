import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { ChickenList } from './components/ChickenList';
import { ChickenForm } from './components/ChickenForm';
import { WeightForm } from './components/WeightForm';
import { ChickenDto } from './types';

const App: React.FC = () => {
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [selectedChicken, setSelectedChicken] = useState<ChickenDto | null>(null);

  return (
    <Provider store={store}>
      <div>
        <h1>Chicken Statistics</h1>
        <ChickenForm />
        <ChickenList
          onAddWeight={chicken => {
            setSelectedChicken(chicken);
            setShowWeightForm(true);
          }}
        />
        {showWeightForm && (
          <WeightForm
            chicken={selectedChicken}
            onClose={() => setShowWeightForm(false)}
            onWeightAdded={() => setShowWeightForm(false)}
          />
        )}
      </div>
    </Provider>
  );
};

export default App;
