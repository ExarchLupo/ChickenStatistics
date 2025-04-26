import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChickenWeightDto } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeightChartProps {
  weights: ChickenWeightDto[];
}

const WeightChart: React.FC<WeightChartProps> = ({ weights }) => {
  const sortedWeights = [...weights].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const data = {
    labels: sortedWeights.map(w => new Date(w.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Gewicht (kg)',
        data: sortedWeights.map(w => w.weight), // kg direkt übernehmen
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Gewichtsverlauf (kg)' },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Gewicht (kg)'
        }
      }
    }
  };
  return <Line data={data} options={options} />;
};

export default WeightChart;
