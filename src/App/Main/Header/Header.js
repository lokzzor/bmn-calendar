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

    const AppHeader = () => {
        const isAuth = useSelector(state => state.user.isAuth);
        const count = useSelector(state => state.other.countnewevent);
        const dispatch = useDispatch();            
        React.useEffect(() => { dispatch(getCalendarNewEvent()) }, [dispatch])
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
                        Home</Link>
                    </div>
                    <div>
                        <Link className="header-link" to="/event-list">
                        <div className="header-event-block"><mark className="header-event-big header-event-swing">{count}</mark></div>
                        <IconButton color="inherit"> <EventAvailableIcon className="navicons header-bar-menu-icon" /> </IconButton>
                        Event</Link>
                    </div>
                    { isAuth && <div>
                        <Link className="header-link" to="/dictionary">
                        <IconButton color="inherit">
                            <SettingsApplicationsIcon className="navicons header-bar-menu-icon" />
                        </IconButton>
                        Dictionary</Link>
                    </div>}
                    { !isAuth && <div>
                        <Link className="header-link" to="/account">
                        <IconButton color="inherit"> <TouchAppIcon className="navicons header-bar-menu-icon" /> </IconButton>
                        Sing In</Link>
                    </div>}
                    { isAuth && <div  onClick={() => { dispatch(logout()) }}>
                    <Link className="header-link" to="/"  >
                        <IconButton color="inherit"><MeetingRoomIcon className="navicons header-bar-menu-icon" /></IconButton>
                       Log Out</Link>
                    </div>}
                </div>
            </div>
            </>
        )
    }
export default AppHeader;