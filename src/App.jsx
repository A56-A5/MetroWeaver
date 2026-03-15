import React, { useState, useEffect, useCallback, useMemo } from 'react';
import HUD from './components/HUD';
import GameBoard from './components/GameBoard';
import Instructions from './components/Instructions';
import { createGraph, calculateDistance } from './logic/graph';
import { generateCity } from './logic/cityGenerator';
import { calculateMST } from './logic/mst';
import { findShortestPath } from './logic/dijkstra';
import './index.css';

const INITIAL_BUDGET = 500;
const STATION_COUNT = 10;
const PASSENGER_SPAWN_INTERVAL = 3000;

function App() {
  const [stations, setStations] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [selectedStation, setSelectedStation] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [mstData, setMstData] = useState({ totalCost: 0, edges: [] });
  const [efficiency, setEfficiency] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [showMST, setShowMST] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Derived graph object for algorithms
  const graph = useMemo(() => createGraph(stations, tracks), [stations, tracks]);

  // Initialize City
  const initCity = useCallback(() => {
    const newStations = generateCity(STATION_COUNT, 800, 600);
    setStations(newStations);
    setTracks([]);
    setBudget(INITIAL_BUDGET);
    setSelectedStation(null);
    setPassengers([]);
    setShowResults(false);
    setShowMST(false);
    
    const mst = calculateMST(newStations);
    setMstData(mst);
    setBudget(Math.ceil(mst.totalCost * 1.5));
    setEfficiency(1);
  }, []);

  useEffect(() => {
    initCity();
  }, [initCity]);

  // Handle Station Click
  const handleStationClick = (id) => {
    if (!selectedStation) {
      setSelectedStation(id);
    } else if (selectedStation === id) {
      setSelectedStation(null);
    } else {
      const uId = selectedStation;
      const vId = id;
      
      const existingTrackIndex = tracks.findIndex(
        t => (t.u === uId && t.v === vId) || (t.u === vId && t.v === uId)
      );

      if (existingTrackIndex !== -1) {
        // Remove track
        const trackToRemove = tracks[existingTrackIndex];
        setTracks(prev => prev.filter((_, i) => i !== existingTrackIndex));
        setBudget(prev => prev + trackToRemove.weight);
        setSelectedStation(null);
      } else {
        const u = stations.find(s => s.id === uId);
        const v = stations.find(s => s.id === vId);
        const cost = calculateDistance(u, v);

        if (budget >= cost) {
          setTracks(prev => [...prev, { u: u.id, v: v.id, weight: cost }]);
          setBudget(prev => prev - cost);
          setSelectedStation(null);
        } else {
          setSelectedStation(null);
        }
      }
    }
  };

  const removeTrack = (uId, vId) => {
    const existingTrack = tracks.find(
      t => (t.u === uId && t.v === vId) || (t.u === vId && t.v === uId)
    );
    if (existingTrack) {
      setTracks(prev => prev.filter(t => t !== existingTrack));
      setBudget(prev => prev + existingTrack.weight);
    }
  };

  // Update Efficiency when tracks change
  useEffect(() => {
    if (tracks.length === 0) {
      setEfficiency(1);
      return;
    }
    const currentCost = tracks.reduce((acc, t) => acc + t.weight, 0);
    setEfficiency(Math.min(mstData.totalCost / currentCost, 1));
  }, [tracks, mstData.totalCost]);

  // Passenger Spawning
  useEffect(() => {
    const interval = setInterval(() => {
      if (stations.length < 2) return;

      const startIdx = Math.floor(Math.random() * stations.length);
      let endIdx = Math.floor(Math.random() * stations.length);
      while (endIdx === startIdx) {
        endIdx = Math.floor(Math.random() * stations.length);
      }

      const start = stations[startIdx];
      const end = stations[endIdx];

      const { path, distance } = findShortestPath(graph, start.id, end.id);

      if (path.length > 0) {
        const directDist = calculateDistance(start, end);
        const pathEfficiency = directDist / distance;
        
        setPassengers(prev => [...prev, {
          id: Date.now() + Math.random(),
          path,
          efficiency: pathEfficiency
        }]);
      }
    }, PASSENGER_SPAWN_INTERVAL);

    return () => clearInterval(interval);
  }, [stations, graph]);

  const removePassenger = (id) => {
    setPassengers(prev => prev.filter(p => p.id !== id));
  };

  const currentCost = tracks.reduce((acc, t) => acc + t.weight, 0);
  const stationsConnected = new Set(tracks.flatMap(t => [t.u, t.v])).size;

  return (
    <div className="app-container">
      <HUD 
        budget={budget}
        stationsConnected={stationsConnected}
        efficiency={efficiency}
        onReset={initCity}
        onShowHelp={() => setShowInstructions(true)}
      />
      <GameBoard 
        stations={stations}
        tracks={tracks}
        mstEdges={mstData.edges}
        showMST={showMST}
        passengers={passengers}
        selectedStation={selectedStation}
        onStationClick={handleStationClick}
        onTrackClick={removeTrack}
        onPassengerComplete={removePassenger}
      />
      
      {!showResults && (
        <button className="analyze-btn" onClick={() => setShowResults(true)}>
          Analyze Network
        </button>
      )}

      {showResults && (
        <div className="results-overlay">
          <div className="results-card">
            <h2>Network Analysis</h2>
            <div className="results-grid">
              <div className="result-item">
                <span className="label">Optimal MST Cost</span>
                <span className="value">₹{mstData.totalCost.toFixed(0)}</span>
              </div>
              <div className="result-item">
                <span className="label">Your Network Cost</span>
                <span className="value">₹{currentCost.toFixed(0)}</span>
              </div>
              <div className="result-item">
                <span className="label">Station Coverage</span>
                <span className="value">{stationsConnected}/{STATION_COUNT}</span>
              </div>
              <div className="result-item">
                <span className="label">Average Efficiency</span>
                <span className="value">{(efficiency * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div className="btn-group">
              <button 
                className="toggle-mst-btn" 
                onClick={() => setShowMST(!showMST)}
              >
                {showMST ? "Hide Optimal Paths" : "Show Optimal Paths"}
              </button>
              <button className="close-btn" onClick={() => setShowResults(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showInstructions && (
        <Instructions onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}

export default App;
