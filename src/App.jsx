import React, { useEffect, useState } from 'react';
import { db } from './services/firebase';
import { BrowserView, MobileView } from "react-device-detect"; 
import { BrowserRouter as Router, Route, Switch, Redirect, Navigate, Routes, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
}

  const handleMode = (key) => {
    setModeState(key);
  }
  // const [questions, setQuestions] = useState([]);

  // useEffect(() => {
  //   console.log(questions)
  // },[questions]);

  // useEffect(() => {
  //   async function fetchQuestions() {
  //     const querySnapshot = await getDocs(collection(db, "hsk1"));
  //     const questionsList = [];
  //     querySnapshot.forEach((doc) => {
  //       questionsList.push({ id: doc.id, ...doc.data() });
  //     });
  //     setQuestions(questionsList);
  //   }

  //   fetchQuestions();
  // }, []);

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
