import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const salesData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    datasets: [
      {
        label: 'Продажи (в тыс. руб.)',
        data: [120, 150, 180, 200, 220, 250],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Сумма продаж (тыс. руб.)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Месяц',
        },
      },
    },
  };

  return (
    <div className="bar-chart">
      <h2>Продажи по месяцам</h2>
      <Bar data={salesData} options={options} />
    </div>
  );
};

export default BarChart;
