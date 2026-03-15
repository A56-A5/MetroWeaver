import React, { useEffect, useState } from 'react';

const Passenger = ({ path, stations, onComplete }) => {
  const [currentPos, setCurrentPos] = useState(null);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (path.length < 2) {
      onComplete();
      return;
    }

    const startStation = stations.find(s => s.id === path[segmentIndex]);
    const endStation = stations.find(s => s.id === path[segmentIndex + 1]);

    if (!startStation || !endStation) {
      onComplete();
      return;
    }

    const duration = 1000; // 1 second per segment
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      const x = startStation.x + (endStation.x - startStation.x) * t;
      const y = startStation.y + (endStation.y - startStation.y) * t;
      
      setCurrentPos({ x, y });
      setProgress(t);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        if (segmentIndex + 2 < path.length) {
          setSegmentIndex(segmentIndex + 1);
          setProgress(0);
        } else {
          onComplete();
        }
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [segmentIndex, path, stations, onComplete]);

  if (!currentPos) return null;

  return (
    <circle 
      cx={currentPos.x} 
      cy={currentPos.y} 
      r="4" 
      className="passenger-dot"
    />
  );
};

export default Passenger;
