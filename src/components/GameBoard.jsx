import React from 'react';
import Station from './Station';
import Track from './Track';
import Passenger from './Passenger';

const GameBoard = ({ 
  stations, 
  tracks, 
  mstEdges,
  showMST,
  passengers, 
  selectedStation, 
  onStationClick,
  onPassengerComplete 
}) => {
  return (
    <div className="game-board">
      <svg width="100%" height="100%" viewBox="0 0 800 600">
        {/* Render MST Overlay if enabled */}
        {showMST && mstEdges.map((edge, index) => {
          const u = stations.find(s => s.id === edge.u);
          const v = stations.find(s => s.id === edge.v);
          if (!u || !v) return null;
          return (
            <line 
              key={`mst-${index}`}
              x1={u.x} y1={u.y} x2={v.x} y2={v.y} 
              className="mst-line"
              strokeDasharray="5,5"
            />
          );
        })}

        {/* Render Player Tracks */}
        {tracks.map((track, index) => {
          const u = stations.find(s => s.id === track.u);
          const v = stations.find(s => s.id === track.v);
          if (!u || !v) return null;
          return <Track key={`track-${index}`} u={u} v={v} />;
        })}

        {/* Render Stations */}
        {stations.map(station => (
          <Station 
            key={station.id} 
            station={station} 
            isSelected={selectedStation === station.id}
            onClick={onStationClick}
          />
        ))}

        {/* Render Passengers */}
        {passengers.map(p => (
          <Passenger 
            key={p.id} 
            path={p.path} 
            stations={stations}
            onComplete={() => onPassengerComplete(p.id)}
          />
        ))}
      </svg>
    </div>
  );
};

export default GameBoard;
