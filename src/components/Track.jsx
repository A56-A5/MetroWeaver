import React from 'react';

const Track = ({ u, v }) => {
  return (
    <line 
      x1={u.x} 
      y1={u.y} 
      x2={v.x} 
      y2={v.y} 
      className="track-line"
    />
  );
};

export default Track;
