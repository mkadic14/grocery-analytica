import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SpendingTrendsChart = () => {
  // Mock data
  const thisYearData = [1200, 1100, 1980, 1300, 1400, 1350, 1450, 1500, 1550, 1600, 1650, 1700];
  const lastYearData = [1150, 1867, 1200, 1250, 1350, 1983, 1700, 1450, 1500, 1550, 1900, 1650];

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: 'This Year',
        data: thisYearData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Last Year',
        data: lastYearData,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false, 
      }
    }
  };

  return (<Line data={data} options={options} />
  );
};

export default SpendingTrendsChart;
