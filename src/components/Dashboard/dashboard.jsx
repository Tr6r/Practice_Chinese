import React, { useEffect, useState ,useRef} from 'react';
import './dashboard.scss';
import { BrowserView, MobileView } from "react-device-detect";
import { db } from '../../services/firebase';
import { collection, addDoc,getDocs,doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Dashboard({ modeState, hadnleLevel }) {
    const data = ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5"];
    const [levelState, setLevelState] = useState("hsk1");
    const [typeState, setTypeState] = useState("lesson");
    const [dropboxState, setDropboxState] = useState("");
    const inputquestionRef = useRef("");
    const inputanswerRef = useRef("");

    const hadnleType = (key) => {
        if (dropboxState == key) {
            setDropboxState("");
        }
        else setDropboxState(key);
    }
    const handleAdd = async () => {
        if(inputanswerRef.current.value == "" || inputquestionRef.current.value == "")
        {
            toast.error("Invalid input, must be not empty",{
                autoClose: 5000, 
              });
            return 
        }
        try {
            const querySnapshot = await getDocs(collection(db, levelState));
            const newDocId = (querySnapshot.size + 1).toString();
            const docRef = await setDoc(doc(db, levelState,newDocId), {
              question: inputquestionRef.current.value,
              answer: inputanswerRef.current.value
              // Thêm các trường dữ liệu khác mà bạn muốn
            });
            inputanswerRef.current.value = "";
            inputquestionRef.current.value = "";
            toast.success("Document added successfully!",{
                autoClose: 1000, 
              });
          } catch (e) {
            console.log("Error adding document: ", e);
            toast.error("Error adding document.",{
                autoClose: 4000, 
              });
          }

        
    }
    return (
        <div className="Dashboard">
            <BrowserView className="Dashboard_Web">
                <div className="Dashboard_Web_Header">
                    {modeState === "lesson" ? "Lesson:" : modeState === "multiplechoice" ? "Multiple Choice:" : "Insert question:"}
                </div>
                {(modeState === "lesson" || modeState === "multiplechoice") ? (
                    <div className="Dashboard_Web_Grid">
                        {data.map((item, index) => (
                            <div
                                className="Dashboard_Web_Grid_Items"
                                key={index}
                                onClick={() => hadnleLevel(index + 1)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ) :
                    (
                        <div>

                            <div className="Dashboard_Web_Title">
                                type:
                                <div className="Dashboard_Web_Title_Type" onClick={() => hadnleType("Type")}>
                                    {typeState}
                                </div>
                                {dropboxState == "Type" ?
                                    <div className="Dashboard_Web_Title_Type_Dropbox">

                                        <div className="Dashboard_Web_Title_Type_Dropbox_Options" onClick={() => (setTypeState("Lesson"), setDropboxState(""))}>
                                            Lesson
                                        </div>
                                        <div className="Dashboard_Web_Title_Type_Dropbox_Options" onClick={() => (setTypeState("Multiple Choice"), setDropboxState(""))}>
                                            Multiple Choice
                                        </div>

                                    </div> :
                                    <></>
                                }
                                <div style={{ height: "10px", width: "100px" }}></div>
                                level:
                                <div className="Dashboard_Web_Title_Type" onClick={() => hadnleType("Level")}>
                                    {levelState}
                                </div>
                                {dropboxState == "Level" ?
                                    <div className="Dashboard_Web_Title_Type_Dropbox" style={{ marginLeft: "440px", height: "200px", marginTop: "250px" }}>

                                        <div className="Dashboard_Web_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk1"), setDropboxState(""))}>
                                            hsk1
                                        </div>
                                        <div className="Dashboard_Web_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk2"), setDropboxState(""))}>
                                            hsk2
                                        </div>
                                        <div className="Dashboard_Web_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk3"), setDropboxState(""))}>
                                            hsk3
                                        </div>
                                        <div className="Dashboard_Web_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk4"), setDropboxState(""))}>
                                            hsk4
                                        </div>
                                        <div className="Dashboard_Web_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk5"), setDropboxState(""))}>
                                            hsk5
                                        </div>

                                    </div>

                                    :
                                    <></>
                                }


                            </div>
                            {
                                typeState == "Multiple Choice" ?
                                    <div className="Dashboard_Web_Addquestion">
                                        <div className="Dashboard_Web_Addquestion_Item">
                                            Question:
                                            <input className="Dashboard_Web_Addquestion_Item_Input" ref={inputquestionRef}></input>
                                        </div>
                                        <div className="Dashboard_Web_Addquestion_Item" >
                                            Answer:
                                            <input className="Dashboard_Web_Addquestion_Item_Input" ref={inputanswerRef}></input>
                                        </div>
                                        <button className="Dashboard_Web_Addquestion_Button" onClick={() => handleAdd()}>
                                            Add
                                        </button>


                                    </div> :
                                    <></>
                            }

                        </div>


                    )
                }

            </BrowserView>
            <MobileView className="Dashboard_App">
                <div className="Dashboard_App_Header">
                    {modeState === "lesson" ? "Lesson:" : modeState === "multiplechoice" ? "Multiple Choice:" : "Insert question:"}
                </div>
                {(modeState === "lesson" || modeState === "multiplechoice") ? (
                    <div className="Dashboard_App_Grid">
                        {data.map((item, index) => (
                            <div
                                className="Dashboard_App_Grid_Items"
                                key={index}
                                onClick={() => hadnleLevel(index + 1)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ) :
                    (
                        <div>

                            <div className="Dashboard_App_Title">
                                type:
                                <div className="Dashboard_App_Title_Type" onClick={() => hadnleType("Type")}>
                                    {typeState}
                                </div>
                                {dropboxState == "Type" ?
                                    <div className="Dashboard_App_Title_Type_Dropbox">

                                        <div className="Dashboard_App_Title_Type_Dropbox_Options" onClick={() => (setTypeState("Lesson"), setDropboxState(""))}>
                                            Lesson
                                        </div>
                                        <div className="Dashboard_App_Title_Type_Dropbox_Options" onClick={() => (setTypeState("Multiple Choice"), setDropboxState(""))}>
                                            Multiple Choice
                                        </div>

                                    </div> :
                                    <></>
                                }
                                <div style={{ height: "10px", width: "100px" }}></div>
                                level:
                                <div className="Dashboard_App_Title_Type" onClick={() => hadnleType("Level")}>
                                    {levelState}
                                </div>
                                {dropboxState == "Level" ?
                                    <div className="Dashboard_App_Title_Type_Dropbox" style={{ marginLeft: "440px", height: "200px", marginTop: "250px" }}>

                                        <div className="Dashboard_App_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk1"), setDropboxState(""))}>
                                            hsk1
                                        </div>
                                        <div className="Dashboard_App_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk2"), setDropboxState(""))}>
                                            hsk2
                                        </div>
                                        <div className="Dashboard_App_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk3"), setDropboxState(""))}>
                                            hsk3
                                        </div>
                                        <div className="Dashboard_App_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk4"), setDropboxState(""))}>
                                            hsk4
                                        </div>
                                        <div className="Dashboard_App_Title_Type_Dropbox_Options" onClick={() => (setLevelState("hsk5"), setDropboxState(""))}>
                                            hsk5
                                        </div>

                                    </div>

                                    :
                                    <></>
                                }


                            </div>
                            {
                                typeState == "Multiple Choice" ?
                                    <div className="Dashboard_App_Addquestion">
                                        <div className="Dashboard_App_Addquestion_Item">
                                            Question:
                                            <input className="Dashboard_App_Addquestion_Item_Input" ref={inputquestionRef}></input>
                                        </div>
                                        <div className="Dashboard_App_Addquestion_Item" >
                                            Answer:
                                            <input className="Dashboard_App_Addquestion_Item_Input" ref={inputanswerRef}></input>
                                        </div>
                                        <button className="Dashboard_App_Addquestion_Button" onClick={() => handleAdd()}>
                                            Add
                                        </button>


                                    </div> :
                                    <></>
                            }

                        </div>


                    )
                }

            </MobileView>
        </div>
    );
}

export default Dashboard;
