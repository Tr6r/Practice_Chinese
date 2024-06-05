import React, { useEffect, useState } from 'react';
import './dashboard.scss'
import { BrowserView, MobileView } from "react-device-detect";
import { useNavigate } from 'react-router-dom';
function Dasboard({ modeState,hadnleLevel }) {
    
    const data = ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5"];
    
   
    return (
        <div className="Dashboard">
            <BrowserView className="Dashboard_Web">
                <div className="Dashboard_Web_Header">
                    {
                        modeState === "lesson" ? "Lesson:" : modeState === "multiplechoice" ? "Multiple Choice:" : "Insert File:"
                    }
                </div>
                {
                    modeState === "lesson" || modeState === "multiplechoice" ?
                        <div>

                            <div div className="Dashboard_Web_Grid">
                                { 
                                    data.map((item, index) => {
                                        return (
                                            <div className="Dashboard_Web_Grid_Items" key={index} onClick={() => hadnleLevel(index +1)}>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        :
                        <></>
                }

            </BrowserView>
            <MobileView>

            </MobileView>
        </div>
    );
}

export default Dasboard;
