import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core/';
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import TouchAppIcon from '@material-ui/icons/TouchApp';

import {getCalendarNewEvent} from '../../../Actions/simpleget'
import {logout} from '../../../Reducers/userReducer'
import {useDispatch, useSelector} from 'react-redux';
import { Disconnect } from "../../Functions/Disconnect/disconnect"

    const AppHeader = () => {
        const isAuth = useSelector(state => state.user);

        const [event, eventShowModal] = React.useState(false);
        const evnt = () => { eventShowModal(!event);};
        const count = useSelector(state => state.other.countnewevent);
        const dispatch = useDispatch();      
        React.useEffect(() => { if(count === undefined) evnt(); }, [count]);      
        React.useEffect(() => { dispatch(getCalendarNewEvent()) }, [dispatch]);
 
        return (
            <>
            <div className="header-bar">
                <Link to='/' className="header-bar-title">
                    <EventNoteIcon />&nbsp;<p>Meeting Calendar</p>
                </Link>
                <div className="header-bar-menu">
                    <div>
                        <Link className="header-link" to="/">
                        <IconButton color="inherit"> <HomeIcon className="navicons header-bar-menu-icon"/></IconButton>
                        <span className="nonemenu">Home</span></Link>
                    </div>
                    <div>
                        <Link className="header-link" to="/event-list">
                        <div className="header-event-block"><mark className="header-event-big header-event-swing">{count}</mark></div>
                        <IconButton color="inherit"> <EventAvailableIcon className="navicons header-bar-menu-icon" /> </IconButton>
                        <span className="nonemenu">Event</span></Link>
                    </div>
                    { isAuth.currentUser.isAdmin && <div className="nonemenu2">
                        <Link className="header-link" to="/dictionary">
                        <IconButton color="inherit">
                            <SettingsApplicationsIcon className="navicons header-bar-menu-icon" />
                        </IconButton>
                        <span className="nonemenu">Dictionary</span></Link>
                    </div>}
                    { !isAuth.isAuth && <div>
                        <Link className="header-link" to="/account">
                        <IconButton color="inherit"> <TouchAppIcon className="navicons header-bar-menu-icon" /> </IconButton>
                        <span className="nonemenu">Sing In</span></Link>
                    </div>}
                    { isAuth.isAuth && <div  onClick={() => { dispatch(logout()) }}>
                    <Link className="header-link" to="/"  >
                        <IconButton color="inherit"><MeetingRoomIcon className="navicons header-bar-menu-icon" /></IconButton>
                        <span className="nonemenu">Log Out</span></Link>
                    </div>}
                </div>
                <Disconnect close={evnt.bind(this)} showModal={event} setShowModal={eventShowModal} />                    
            </div>
            </>
        )
    }
export default AppHeader;