import React from 'react'
import './SmallCalendar.css';

import moment from "moment";
import ListItem from "@material-ui/core/ListItem";
import { Eventcal } from "../../Functions/AddEvent/AddEvent"
import { sCalendarSelect } from '../../../Actions/simpleget'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core/';

import EventNoteIcon from '@material-ui/icons/EventNote';
import RoomIcon from '@material-ui/icons/Room';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import AddCircleIcon from "@material-ui/icons/AddCircle";


const Smcalendar = () => {
    const dispatch = useDispatch();
    const selectscall = useSelector(state => state.other.selectscall);
    React.useEffect(() => { dispatch(sCalendarSelect()); 
    }, [dispatch])

    const [showModal, setShowModal] = React.useState(false);
    const [window, setWindow] = React.useState(false);
    const openModal = () => { setShowModal(!showModal)} 
    const onMouseEnterHandler = (n) =>{
        setWindow(n);
    }
    const onMouseLeaveHandler = () =>{
        setWindow(false);
    }
    return (
        <>
            <div className="scalendar-box">
                { window &&
                <div key={window.eventid} className="home-itemevent">
                    <div className="home-itemevent_header2"></div>
                    <div className="home-itemevent_content">
                    <div className="home-itemevent_title">
                        <EventNoteIcon className="home-svgmain" />
                        <div> 
                            <div className="home-itemevent_title_name">{window.event_name}</div> 
                            <div className="home-padevent home-itemevent_title_date">{moment(window.event_start).format('dddd, D MMMM YYYY')}</div>
                        </div>
                    </div>
                    <div className="home-itemevent_time">
                        <svg className="home-svgall MuiSvgIcon-root makeStyles-icon-1676" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                        <div className="home-padevent">
                        {moment(window.event_start).format('HH:mm')}
                        <span> - </span>
                        {moment(window.event_end).format('HH:mm')}
                        </div>
                    </div>
                    <div className="home-itemevent_author">
                        <HowToRegIcon className="home-svgall" />
                        <div className="home-padevent">{window.person_login}</div>
                    </div>
                    <div className="home-itemevent_room">
                        <RoomIcon className="home-svgall" />
                        <div className="home-padevent">{window.room_name}</div>
                    </div>
                </div>
                </div>
                }
                <h2 className="scalendar-box-title cursor"> {moment(new Date()).format("dddd")} </h2>
                <div className="small-calendar-day cursor">
                    {moment(new Date()).format("DD")}
                </div>
                <div className="small-calendar-eventlist">
                <span className="layer cursor">Curent Event:</span>
                    <ol className="color-with-svg">
                        { selectscall.length === 0 
                        ? <li className="listli"  key='1'><DonutLargeIcon className="colorcircle"/><span className="small-calendar-titleevent">There are no scheduled events today</span></li> 
                        : selectscall.slice(0, 3).map(n => { return <li className="listli" key={n.event_id} ><DonutLargeIcon className="colorcircle"/><span onMouseEnter={onMouseEnterHandler.bind(this, n)} onMouseLeave={onMouseLeaveHandler.bind(this, n)} className="small-calendar-titleevent">{n.event_name}</span></li> })}
                   </ol>
                </div>
                <div className="small-calendar-eventadd">
                    <Eventcal close={openModal.bind(this)} showModal={showModal} setShowModal={setShowModal} />                    
                    <ListItem onClick={openModal.bind(this)} className="small-calendar-side-button" button>
                        <p className="title-menu small-calendar-add-func-event">
                            <>Create an Event</>{" "}
                            <AddCircleIcon style={{ marginLeft: "3%" }} />
                        </p>
                    </ListItem>
                </div>
            </div>
        </>
        )
    }
export default Smcalendar;

/* 
            if(resp.data.length === 0){
                const pre =<li className="listli"  key='1'><DonutLargeIcon className="colorcircle"/><span className="small-calendar-titleevent">There are no scheduled events today</span></li>;
                this.setState(() => ({ eventdata: pre }));
            } else{
                const pre2 =resp.data.slice(0, 3).map(n => {
                    return <li className="listli" key={n.event_id} ><DonutLargeIcon className="colorcircle"/><span className="small-calendar-titleevent">{n.event_name}</span></li>    
                    });
                    this.setState(() => ({ eventdata: pre2 }));
            }
 */