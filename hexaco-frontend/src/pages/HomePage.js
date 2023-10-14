import React from 'react';
import { Link } from 'react-router-dom';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';

const HomePage = () => {
  const data = {
    labels: ['Schizotypal', 'FFM', 'Winx'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#063615', '#4aac45', '#196729'],
        hoverBackgroundColor: ['#063615', '#4aac45', '#196729'],
      },
    ],
  };
  const options = {
    responsive: true,
  };
  return (
    <div className='homepage'>
      <div className='section-title mb-5'>Dashboard</div>
      <div className='section-header mt-5 mb-3'>Assessment Fill Rate</div>
      <div className='d-flex justify-space-between'>
        <div>
          <PieChart data={data} options={options} />
        </div>
        <div>
          <div className='section-header mt-5 mb-3'>Which Winx Are You</div>
          <div>
            <BarChart data={data} options={options} />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HomePage;
