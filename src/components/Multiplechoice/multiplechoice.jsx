import React, { useEffect, useState } from 'react';
import './multiplechoice.scss';
import { BrowserView, MobileView } from "react-device-detect";
import { Navigate, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../services/firebase';


function Multiplechoice() {
    const [questions, setQuestions] = useState([]);
    const [data, setData] = useState([]);
    var level = localStorage.getItem('levelState')
    const navigate = useNavigate();
    const [countAnswer, setCountAnswer] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [results, setResults] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);

        
      useEffect(() => {
    console.log(data)
    if (data.length > 0)
        {
            const question = data[countAnswer];
            const randomized = randomizeAnswers(question);
            setShuffledAnswers(randomized);
            setSelectedAnswer(null);  // Reset trạng thái đã chọn khi câu hỏi thay đổi
            setIsCorrect(null);       // Reset kết quả kiểm tra khi câu hỏi thay đổi
        }
 
  },[data]);
  useEffect(() => {
    console.log(shuffledAnswers)
    
 
  },[shuffledAnswers]);

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'hsk' + level));
            const numDocuments = querySnapshot.size;

            // Tạo một mảng các chỉ số từ 0 đến số lượng tài liệu - 1
            const indexArray = Array.from({ length: numDocuments }, (_, i) => i);

            // Xáo trộn mảng chỉ số
            for (let i = indexArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indexArray[i], indexArray[j]] = [indexArray[j], indexArray[i]];
            }

            // Chọn 10 chỉ số ngẫu nhiên từ mảng đã xáo trộn
            const randomIndexes = indexArray.slice(0, 10);

            // Lấy 10 tài liệu tương ứng từ Firestore
            const randomDocuments = randomIndexes.map(index => querySnapshot.docs[index].data());

            // Tạo dữ liệu mới từ 10 tài liệu đã chọn
            const newData = randomDocuments.map(doc => {
                const allAnswers = randomDocuments
                    .map(d => d.answer)
                    .filter(answer => answer !== doc.answer);

                // Xáo trộn các câu trả lời
                for (let i = allAnswers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
                }

                return {
                    id: doc.id,
                    question: doc.question,
                    answer1: doc.answer, // Câu trả lời đúng
                    answer2: allAnswers[0] || "Random Answer 1",
                    answer3: allAnswers[1] || "Random Answer 2",
                    answer4: allAnswers[2] || "Random Answer 3"
                };
            });

            setData(newData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    fetchData();
}, []);

    // const data = [
    //     {
    //         id: 1,
    //         question: "cascascascascacascaasssssssssssaasnnnn cascascascascacascaasssssssssssaasnnnn",
    //         answer1: "auaasad1",
    //         answer2: "auaasadads2",
    //         answer3: "auaád3",
    //         answer4: "ausfdda4"
    //     },
    //     {
    //         id: 2,
    //         question: "cascascascascacascascascascascascascascasc",
    //         answer1: "aua1",
    //         answer2: "aua2",
    //         answer3: "aua3",
    //         answer4: "aua4",
    //     },
    //     {
    //         id: 3,
    //         question: "cascascascascacascascascascascascascascasc",
    //         answer1: "aua1",
    //         answer2: "aua2",
    //         answer3: "aua3",
    //         answer4: "aua4",
    //     }, {
    //         id: 4,
    //         question: "cascascascascacascaasssssssssssaasnnnn cascascascascacascaasssssssssssaasnnnn",
    //         answer1: "auaasad1",
    //         answer2: "auaasadads2",
    //         answer3: "auaád3",
    //         answer4: "ausfdda4"
    //     },
    //     {
    //         id: 5,
    //         question: "cascascascascacascascascascascascascascasc",
    //         answer1: "aua1",
    //         answer2: "aua2",
    //         answer3: "aua3",
    //         answer4: "aua4",
    //     },
    //     {
    //         id: 6,
    //         question: "cascascascascacascascascascascascascascasc",
    //         answer1: "aua1",
    //         answer2: "aua2",
    //         answer3: "aua3",
    //         answer4: "aua4",
    //     }, {
    //         id: 7,
    //         question: "cascascascascacascaasssssssssssaasnnnn cascascascascacascaasssssssssssaasnnnn",
    //         answer1: "auaasad1",
    //         answer2: "auaasadads2",
    //         answer3: "auaád3",
    //         answer4: "ausfdda4"
    //     },
    //     {
    //         id: 8,
    //         question: "cascascascascacascascascascascascascascasc",
    //         answer1: "aua1",
    //         answer2: "aua2",
    //         answer3: "aua3",
    //         answer4: "aua4",
    //     },
    //     {
    //         id: 9,
    //         question: "cascascascascacascascascascascascascascasc",
    //         answer1: "aua1",
    //         answer2: "aua2",
    //         answer3: "aua3",
    //         answer4: "aua4",
    //     },
    //     {
    //         id: 10,
    //         question: "cascascascascacascascascascascascascascasc",
    //         answer1: "aua1",
    //         answer2: "aua2",
    //         answer3: "aua3",
    //         answer4: "aua4",
    //     }
    // ];

    useEffect(() => {
        if (countAnswer < data.length) {
            const question = data[countAnswer];
            const randomized = randomizeAnswers(question);
            setShuffledAnswers(randomized);
            setSelectedAnswer(null);  // Reset trạng thái đã chọn khi câu hỏi thay đổi
            setIsCorrect(null);       // Reset kết quả kiểm tra khi câu hỏi thay đổi
        }
    }, [countAnswer]);

    function randomizeAnswers(question) {
        const answers = [
            { text: question.answer1, correct: true },
            { text: question.answer2, correct: false },
            { text: question.answer3, correct: false },
            { text: question.answer4, correct: false }
        ];

        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }

        return answers;
    }

    function handleAnswerClick(answer) {
        setSelectedAnswer(answer);
        setIsCorrect(answer.correct);

        setTimeout(() => {
            const correctAnswer = shuffledAnswers.find(ans => ans.correct).text;
            setResults([...results, { questionId: data[countAnswer].id, question: data[countAnswer].question, correctAnswer, selectedAnswer: answer.text, isCorrect: answer.correct }]);

            if (countAnswer < data.length - 1) {
                setCountAnswer(countAnswer + 1);
            } else {
                setQuizFinished(true);
            }
        }, 500); // Wait for 1 second before moving to the next question
    }

    return (
        <div className="Multiplechoice">
            <BrowserView className="Multiplechoice_Web">
                {quizFinished ? (
                    <div className="Multiplechoice_Web_Result">
                        <h2>Quiz Results</h2>
                        {results.map((result, index) => (
                            <div key={index} className={`Multiplechoice_Web_Result_Item  ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                                <div>Question {result.questionId}: {result.question}</div>
                                <div>Your Answer: {result.selectedAnswer}</div>
                                <div>Correct Answer: {result.correctAnswer}</div>

                            </div>
                        ))}
                        <div style={{ display: 'flex' }}>
                            <button className="Multiplechoice_Web_Result_Button" onClick={() => window.location.reload()}>
                                Do it again!
                            </button>
                            <button style={{ width: "250px", fontSize: "24px" }} className="Multiplechoice_Web_Result_Button" onClick={() => navigate("/Practice_Chinese/dashboard")}>
                                Return to Dashboard
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="Multiplechoice_Web_Header">
                            Multiple choice, hsk{level}
                            <div className="Multiplechoice_Web_Header_Number" style={{ marginRight: '45px' }}>
                                {countAnswer + 1}/{data.length}
                            </div>
                        </div>
                        <div className="Multiplechoice_Web_Question">
                            <div className="Multiplechoice_Web_Question_Container">
                                <div className="Multiplechoice_Web_Question_Container_Question">
                                {data.length !== 0 ? data[countAnswer].question : null}
                                    
                                </div>
                                <div className="Multiplechoice_Web_Question_Container_Grip">
                                    {shuffledAnswers.map((answer, index) => (
                                        <div
                                            key={index}
                                            className={`Multiplechoice_Web_Question_Container_Grip_Items ${selectedAnswer === answer ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                                            onClick={() => handleAnswerClick(answer)}
                                        >
                                            {answer.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </BrowserView>
            <MobileView>
                {/* Mobile view content */}
            </MobileView>
        </div>
    );
}

export default Multiplechoice;
