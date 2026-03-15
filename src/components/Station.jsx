import React from 'react';

const Station = ({ station, isSelected, onClick }) => {
  return (
    <g 
      className={`station ${isSelected ? 'selected' : ''}`} 
      onClick={() => onClick(station.id)}
    >
      <circle 
        cx={station.x} 
        cy={station.y} 
        r="8" 
        className="station-border" 
      />
      <circle 
        cx={station.x} 
        cy={station.y} 
        r="4" 
        className="station-center" 
      />
      <text 
        x={station.x} 
        y={station.y - 15} 
        textAnchor="middle" 
        className="station-name"
      >
        {station.name}
      </text>
    </g>
  );
};

export default Station;
