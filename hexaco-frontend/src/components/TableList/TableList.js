import React, { useState } from 'react';
import './TableList.scss';

function TableList({ columns, data, className }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortArrow = (column) => {
    if (column === sortColumn) {
      return sortDirection === 'asc' ? '↑' : '↓';
    }
    return null;
  };

  const sortedData = data.slice().sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <table className={`table ${className || ''}`}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={Object.keys(column)[0]}
              onClick={() => handleSort(Object.keys(column)[0])}
              style={{ cursor: 'pointer' }}
            >
              {column[Object.keys(column)[0]]} {renderSortArrow(Object.keys(column)[0])}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={Object.keys(column)[0]}>{item[Object.keys(column)[0]]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableList;
