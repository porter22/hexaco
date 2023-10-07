import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({ data, options }) => {
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChart;
