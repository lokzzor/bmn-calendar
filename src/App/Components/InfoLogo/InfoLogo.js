import React from 'react';
import './infologo.css';
import omus from "../../Components/Weather/img/omus.png";


function InfoLogo () {

    return (
        <>
            <div className="cloud-service">
                <div className="cloud-service-cloud">
                    <a href="http://www.jinr.ru/main-en/">
                    <img
                        src="https://nica.jinr.ru/images/jinr-logo-eng.png"
                        height="100"
                        alt=""
                    />
                    </a>
                </div>
                <div className="cloud-service-cloud">
                    <a href="http://omus.jinr.ru/">
                    <img src={omus} height="100" alt="" />
                    </a>
                </div>
            </div>
        </>
    )

}

export default InfoLogo;