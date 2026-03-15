import React from 'react';

const HUD = ({ budget, stationsConnected, efficiency, satisfaction, onReset }) => {
  return (
    <div className="hud">
      <div className="hud-metric">
        <span className="label">Budget</span>
        <span className="value">₹{budget.toFixed(0)}</span>
      </div>
      <div className="hud-metric">
        <span className="label">Stations</span>
        <span className="value">{stationsConnected}</span>
      </div>
      <div className="hud-metric">
        <span className="label">Efficiency</span>
        <span className="value">{(efficiency * 100).toFixed(1)}%</span>
      </div>
      <button className="reset-btn" onClick={onReset}>New City</button>
    </div>
  );
};

export default HUD;
