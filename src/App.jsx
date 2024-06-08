import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Navigate, Routes,useNavigate } from 'react-router-dom';
import Menu from './components/Menu/menu'
import Dasboard from './components/Dashboard/dashboard'
import Multiplechoice from './components/Multiplechoice/multiplechoice'
import Lesson from './components/lesson/lesson'

function App() {
  const navigate = useNavigate();

  const [modeState, setModeState] = useState("lesson");
  const [levelState, setLevelState] = useState("");
  const hadnleLevel = (level) => {
   
    navigate("/Practice_Chinese/"+modeState)
    setLevelState(level)
    localStorage.setItem('levelState', level);
}

  const handleMode = (key) => {
    setModeState(key);
  }
  return (
  
      <div className="App" style={{ position: "fixed", width: "100%", height: "100vh" }}>
      <Menu modeState={modeState} handleMode={handleMode}/>
      
      <Routes>

          <Route path="/Practice_Chinese/dashboard" element={<Dasboard modeState={modeState} hadnleLevel={hadnleLevel} />} />
          <Route path="/Practice_Chinese/multiplechoice" element={<Multiplechoice levelState={levelState}/>} />
          <Route path="/Practice_Chinese/lesson" element={<Lesson levelState={levelState}/>} />

          <Route path="Practice_Chinese/" element={<Navigate to="/Practice_Chinese/dashboard" />} />
      </Routes>

      
      
    </div>
  );
}

export default App;
