import React, { useEffect, useState } from 'react';
import { db } from './services/firebase';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
function App() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log(questions)
  },[questions]);

  useEffect(() => {
    async function fetchQuestions() {
      const querySnapshot = await getDocs(collection(db, "hsk1"));
      const questionsList = [];
      querySnapshot.forEach((doc) => {
        questionsList.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(questionsList);
    }

    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello Bé, trang tiếng trung nghen 
        </p>
        
      </header>
    </div>
  );
}

export default App;
