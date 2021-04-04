import React from 'react';
import './disconnect.css';

import { Spring } from 'react-spring/renderprops'
import attention from "../../Components/Weather/img/attention.png";

export const Disconnect = (props) => {

    return (
        <>
            { props.showModal ? (
                <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>
                    {props4 =>
                        <div style={props4} className="disconnect-background">
                            <div className="disconnect-modalwrapper">
                                <div className="content">
                                    <div className="browser-bar">
                                        <span className="close button"></span>
                                        <span className="min button"></span>
                                        <span className="max button"></span>
                                    </div>
                                    <div className="text">
                                        <img src={attention} style={{ objectFit: "fill", width: "70%" }} alt=""></img>
                                        <p style={{ fontSize: "1.3rem" }}>Technical work on the database is in progress</p>
                                        <p style={{ fontSize: "1.3rem" }}>Please wait</p>
                                        <p style={{ fontSize: "2rem",paddingTop:"1rem" }}>Site will be available soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Spring>
            ) : null}
        </>
    )
}