import React from 'react';
import './App.css';
import {ThreeCanvas} from './ThreeCanvas';
import {mockData, planetRadiuses} from './mockData';

function App() {
  return (
    <div className="App">
      <ThreeCanvas {...mockData} planets={planetRadiuses}/>
    </div>
  );
}

export default App;
