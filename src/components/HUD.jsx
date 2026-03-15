import React, { useState } from 'react';

const HUD = ({ budget, stationsConnected, efficiency, onReset, onShowHelp }) => {
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
      <div className="hud-controls">
        <button className="help-btn" onClick={onShowHelp} title="How to play">?</button>
        <button className="reset-btn" onClick={onReset}>New City</button>
      </div>
    </div>
  );
};

export default HUD;
