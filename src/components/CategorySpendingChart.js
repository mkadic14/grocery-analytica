import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategorySpendingChart = () => {
  const data = {
    labels: ['Produce', 'Seafood', 'Dairy', 'Other'],
    datasets: [
      {
        data: [300, 50, 100, 50], // Example data
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ]
      }
    ]
  };
  
  const options = {
    responsive: true, // Ensure responsiveness
    maintainAspectRatio: true, // Maintain aspect ratio
  };

  return <Pie data={data} options={options} />;
};

export default CategorySpendingChart;
