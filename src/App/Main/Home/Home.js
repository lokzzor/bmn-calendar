import React, { Component } from "react";
import "./Home.css";

/* Add */
import Profile from "../../Components/Profile/Profile"
import Smcalendar from "../../Components/SmallCalendar/SmallCalendar"
import Weather from "../../Components/Weather/Weather"
import InfoLogo from "../../Components/InfoLogo/InfoLogo"
import Firstchart from "../../Components/Charts/FirstChart"
import Secondchart from "../../Components/Charts/SecondChart"
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Calendar from "../../Components/Calendar/Calendar";

export default class Home extends Component {

    render() {
      const scrollTop = () =>{ window.scrollTo({top: 0, behavior: 'smooth'}); };
        return (
            <>
            <div className="home-main-container-prew">
                <Profile />
                <Smcalendar />
                <Weather/>
            </div>
            <div className="home-main-container-calendar">
                <Calendar />
            </div>
            <div className="home-main-container-chart">
                <InfoLogo />
                <Firstchart />
                <Secondchart /> 
            </div>
            <div className="scrol-top">
                <a href="#up">
                    <ExpandLessIcon  onClick={scrollTop} className="scrol-icon-top"/>
                </a>
            </div>
            </>
        );
    }
}