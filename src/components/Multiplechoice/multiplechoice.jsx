import React, { useEffect, useState } from 'react';
import './multiplechoice.scss'
import { BrowserView, MobileView } from "react-device-detect";
function Multiplechoice({levelState}) {
    return (
        <div className="Multiplechoice">
            <BrowserView className="Multiplechoice_Web">
                <div className="Multiplechoice_Header">
                    Multiplechoice, hsk{levelState}

                </div>
               

            </BrowserView>
            <MobileView>

            </MobileView>
        </div>
    );
}

export default Multiplechoice;
