import React, { useEffect, useState } from 'react';
import './lesson.scss'
import { BrowserView, MobileView } from "react-device-detect";
function Lesson({levelState}) {
    return (
        <div className="Lesson">
            <BrowserView className="Lesson_Web">
                <div className="Lesson_Header">
                    Lesson, hsk{levelState}

                </div>
               

            </BrowserView>
            <MobileView>

            </MobileView>
        </div>
    );
}

export default Lesson;
