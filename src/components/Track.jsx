import React from 'react';

const Track = ({ u, v, onClick }) => {
  return (
    <g className="track" onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Hit Area */}
      <line 
        x1={u.x} y1={u.y} x2={v.x} y2={v.y} 
        stroke="transparent"
        strokeWidth="15"
      />
      {/* Visible line */}
      <line 
        x1={u.x} y1={u.y} x2={v.x} y2={v.y} 
        className="track-line"
      />
    </g>
  );
};

export default Track;
