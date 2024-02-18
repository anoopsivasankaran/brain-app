import { Outlet, useLocation, useNavigate } from "react-router-dom";
import './Wrapper.scss';
import { Popup } from "./Popup";
import { useState } from "react";

export default function Wrapper() {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    
    return (
        <div className="Wrapper">
            <div className="header">
                {
                    pathname !== '/' && (
                        <button onClick={() => {
                            if(pathname === '/game') {
                                setShowPopup(true)
                            } else {
                                navigate('..');
                            }
                            
                        }}> &#60; HOME</button>
                    )
                }
                
                <label>Eshan's Mega Mind</label>
            </div>
            <div className="wrapper-body">
                <Outlet />
            </div>
            {
                showPopup && (
                    <Popup
                        message="Do u really want to cancel and go home ?"
                        onYes={() => {
                            navigate('/');
                            setShowPopup(false);
                        }}
                        onNo={() => {
                            setShowPopup(false)
                        }}
                    />
                )
            }
            
        </div>
    );
}
