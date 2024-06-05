import React, { useState } from "react";
import { LuFilePlus } from "react-icons/lu";

import { MdOutlinePlayLesson } from "react-icons/md";
import { BiSelectMultiple } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from "react-device-detect"; 

import './menu.scss'
import bug from "../../icons/Bug(Trắng).png"
import user from "../../images/user.png"
const Menu = ({modeState,handleMode}) => {
   
    const navigate = useNavigate();
    return (
        <div className="Fac_Menu">
            <BrowserView className="Fac_Menu_Web">
                <div className="Fac_Menu_Web_Container">
                    <img  className="Fac_Menu_Web_Container_Logo" src={bug} alt="" />

                    <div className="Fac_Menu_Web_Container_Menu">
             
                        <div className="Fac_Menu_Web_Container_Menu_Elements" onClick={()=>{handleMode("lesson");navigate("/Practice_Chinese/dashboard")}} style={ modeState === "lesson" ? {backgroundColor:"rgba(200, 200, 200, 0.3)",borderRadius:"50%"} : {}}>
                            <MdOutlinePlayLesson className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={25} />

                        </div>
                        <div className="Fac_Menu_Web_Container_Menu_Elements" onClick={()=>{handleMode("multiplechoice");navigate("/Practice_Chinese/dashboard")}} style={ modeState === "multiplechoice" ? {backgroundColor:"rgba(200, 200, 200, 0.3)",borderRadius:"50%"} : {}}>
                            <BiSelectMultiple className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={25}/>

                        </div>
                        <div className="Fac_Menu_Web_Container_Menu_Elements" onClick={()=>{handleMode("insertfile");navigate("/Practice_Chinese/dashboard")}} style={ modeState === "insertfile" ? {backgroundColor:"rgba(200, 200, 200, 0.3)",borderRadius:"50%"} : {}}>
                            <LuFilePlus className="Fac_Menu_Web_Container_Menu_Elements_Icon" size={25}/>

                        </div>

                    </div>
                    <div style={{position:"relative"}}>
                        <img className="Fac_Menu_Web_Container_Avartar" src={user} alt="" />
                      
                        
                    </div>
                    
                </div>
            </BrowserView>

            <MobileView>
                <h1>This is rendered only on mobile</h1>
            </MobileView>
        </div>
    )
}
export default Menu