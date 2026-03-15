import React from 'react';

const Instructions = ({ onClose }) => {
  return (
    <div className="results-overlay">
      <div className="results-card instructions-card">
        <h2>How to Play</h2>
        <div className="instructions-content">
          <div className="instruction-step">
            <span className="step-num">1</span>
            <p><strong>Select a Station:</strong> Click on any circular node to select it as your starting point.</p>
          </div>
          <div className="instruction-step">
            <span className="step-num">2</span>
            <p><strong>Build a Track:</strong> Click on another station to build a track between them. This costs <strong>₹ (Rupees)</strong> based on distance.</p>
          </div>
          <div className="instruction-step">
            <span className="step-num">3</span>
            <p><strong>Observe Flow:</strong> Passengers (red dots) will automatically find the shortest path between stations.</p>
          </div>
          <div className="instruction-step">
            <span className="step-num">4</span>
            <p><strong>Analyze Performance:</strong> Click "Analyze Network" to compare your design against the theoretical optimal (MST).</p>
          </div>
        </div>
        <div className="btn-group">
          <button className="toggle-mst-btn" onClick={onClose}>Got it!</button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
