import React from 'react'
import './EventList.css';
import { IconButton } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { EventListNoActive, EventListSearch, operationRemove, operationOk } from '../../../Actions/event'
import { Eventcal } from "../../Functions/AddEvent/AddEvent"
import {getCalendarNewEvent} from '../../../Actions/simpleget'

import Alert from '@material-ui/lab/Alert';
import moment from "moment";
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import TodayIcon from '@material-ui/icons/Today';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EventNoteIcon from '@material-ui/icons/EventNote';
import RoomIcon from '@material-ui/icons/Room';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const Eventlist = (props) => {
  const [event, eventShowModal] = React.useState(false);
  const evnt = () => { eventShowModal(!event);};


  const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) };
  const dispatch = useDispatch();
  
  const isAuth = useSelector(state => state.user.currentUser.isAdmin);
  const user = useSelector(state => state.user.currentUser.loginName);
  const searchactive = useSelector(state => state.event.eventlist_search);
  const success = useSelector(state => state.other.success);
  const errors = useSelector(state => state.other.errors);
  const eventnoactual = useSelector(state => state.event.eventlist_active);


  React.useEffect(() => { dispatch(EventListNoActive()); 
  }, [dispatch])
  
  const [state, setState] = React.useState({
    search:false,
    search_name:'',
    displaysearch:false,
  });
  const closesearchpapper = () => {
    setState({...state, search: false, search_name:'',displaysearch: false });
  }
  const opensearch = () => {
    if(state.search===false){ setState({...state, search: !state.search, search_name:'' });}
    if(state.search_name.length > 0 && state.displaysearch === false){
      setState({...state, displaysearch: !state.displaysearch  });
      dispatch(EventListSearch(state.search_name));
    }
    if(state.search_name.length > 0 && state.displaysearch === true){
      dispatch(EventListSearch(state.search_name));
    } 
  };
  const removeEvent = (n) => {
    dispatch(operationRemove(n));
    setTimeout( function() { dispatch(getCalendarNewEvent()) }, 100 );
    setTimeout( function() { dispatch(EventListNoActive()); }, 1000 );
  }
  const ok = (n) => {
    n.user=user;
    dispatch(operationOk(n));
    setTimeout( function() { dispatch(getCalendarNewEvent()) }, 100 );
    setTimeout( function() { dispatch(EventListNoActive()); }, 1000 );
  }

  
  return (
    <>
      {errors.length > 0 && <Alert className="alert-list-event" variant="filled" severity="error">{errors}</Alert>}
      {success.length > 0 && <Alert className="alert-list-event" variant="filled" severity="success">{success}</Alert>}
      <div className="eventlist-main">
        <div className="eventlist_section_header">
          <div className="title-header-sect">
              Event List&nbsp; <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4C7.448 4 7 4.448 7 5V8C7 8.265 7.105 8.52 7.293 8.707L9.293 10.707C9.488 10.903 9.744 11 10 11C10.256 11 10.512 10.902 10.707 10.707C11.098 10.316 11.098 9.684 10.707 9.293L9 7.586V5C9 4.448 8.552 4 8 4Z" fill="#8492A6"></path><path d="M13.657 2.343C12.145 0.832 10.136 0 8 0C5.863 0 3.854 0.832 2.343 2.343C0.832 3.855 0 5.864 0 8C0 10.137 0.832 12.146 2.343 13.657C2.461 13.775 2.599 13.868 2.724 13.978H1.5C0.948 13.978 0.5 14.425 0.5 14.978C0.5 15.531 0.948 15.978 1.5 15.978H5C5.552 15.978 6 15.531 6 14.978V11.5C6 10.947 5.552 10.5 5 10.5C4.448 10.5 4 10.947 4 11.5V12.447C3.921 12.376 3.833 12.318 3.757 12.242C2.624 11.109 2 9.603 2 8C2 6.398 2.624 4.891 3.757 3.757C4.891 2.624 6.397 2 8 2C9.602 2 11.109 2.624 12.243 3.757C13.376 4.891 14 6.397 14 8C14 9.603 13.376 11.11 12.242 12.243C11.108 13.376 9.602 14 8 14C7.448 14 7 14.447 7 15C7 15.553 7.448 16 8 16C10.136 16 12.145 15.168 13.656 13.656C15.168 12.147 16 10.137 16 8C16 5.863 15.168 3.854 13.657 2.343Z" fill="#8492A6"></path></svg>
          </div>
          <div className="displayicons">
            {state.search && <div style={{margin: 'auto 0'}}>
              <Paper component="form" className='areapaper'>
                <InputBase
                  className='areasearchinp'
                  placeholder="Search Name Events"
                  value={state.search_name}
                  onChange={(event) => setState({ ...state, search_name: event.target.value })}
                  name="search_name"
                />
                <IconButton onClick={closesearchpapper.bind(this)} className='areasearchicon' aria-label="search">
                  <Tooltip title="Close Search Block " arrow><CloseIcon fontSize="small" /></Tooltip>
                </IconButton>
              </Paper>
            </div>}
            <Tooltip title="Search Event" arrow><IconButton onClick={opensearch.bind(this)} color="inherit"><ImageSearchIcon className="displayicon" /></IconButton></Tooltip>
            <Tooltip title="Add New Event" arrow><IconButton  onClick={evnt.bind(this)} color="inherit"><TodayIcon className="displayicon" /></IconButton></Tooltip>
          </div>
          <Eventcal close={evnt.bind(this)} showModal={event} setShowModal={eventShowModal} />                    
        </div>
      </div>
      { state.displaysearch && <div className="eventlist-search">
        { searchactive.length === 0 
            ? <div key='1' className="nodata">
                No data
              </div>
            : searchactive.slice(0, 12).map(n => { return (
              <div key={n.eventid} className="itemevent">
                <div className="itemevent_header2"></div>
                <div className="itemevent_content">
                  <div className="itemevent_title">
                    <EventNoteIcon className="svgmain" />
                    <div> 
                      <div className="itemevent_title_name">{n.title}</div> 
                      <div className="padevent itemevent_title_date">{moment(n.startDate).format('dddd, D MMMM YYYY')}</div>
                    </div>

                  </div>
                  <div className="itemevent_time">
                    <svg className="svgall MuiSvgIcon-root makeStyles-icon-1676" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                    <div className="padevent">
                      {moment(n.startDate).format('HH:mm')}
                      <span> - </span>
                      {moment(n.endDate).format('HH:mm')}
                    </div>
                  </div>
                  <div className="itemevent_author">
                    <HowToRegIcon className="svgall" />
                    <div className="padevent">{n.person}</div>
                  </div>
                  <div className="itemevent_room">
                    <RoomIcon className="svgall" />
                    <div className="padevent">{n.location}</div>
                  </div>
                </div>
              </div>
            )}) }
        </div>}
      <div className="eventlist-no-active">
        { eventnoactual.length === 0 
          ? <div key='1' className="nodata">
              No data
            </div>
          : eventnoactual.map(n => { return (
            <div key={n.eventid} className="itemevent">
              { isAuth && <div className="itemevent_header">
                <div>
                  <IconButton onClick={ok.bind(this, n)}> <CheckIcon className="iconok" /></IconButton>
                </div>
                <div className="line"></div>
                <div>
                  <IconButton onClick={removeEvent.bind(this, n.eventid)}> <ClearIcon className="iconclose"/></IconButton>
                </div>
              </div>}
              { !isAuth && <div className="itemevent_header2"></div>}
              <div className="itemevent_content">
                <div className="itemevent_title">
                  <EventNoteIcon className="svgmain" />
                  <div> 
                    <div className="itemevent_title_name">{n.title}</div> 
                    <div className="padevent itemevent_title_date">{moment(n.startDate).format('dddd, D MMMM YYYY')}</div>
                  </div>

                </div>
                <div className="itemevent_time">
                  <svg className="svgall MuiSvgIcon-root makeStyles-icon-1676" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                  <div className="padevent">
                    {moment(n.startDate).format('HH:mm')}
                    <span> - </span>
                    {moment(n.endDate).format('HH:mm')}
                  </div>
                </div>
                <div className="itemevent_author">
                  <HowToRegIcon className="svgall" />
                  <div className="padevent">{n.person}</div>
                </div>
                <div className="itemevent_room">
                  <RoomIcon className="svgall" />
                  <div className="padevent">{n.location}</div>
                </div>
              </div>
            </div>
          )}) }        
      </div>
{/*       <div className="eventlist-old">
      { eventold.length === 0 
          ? <div key='1' className="nodata">
              No data
            </div>
          : eventold.map(n => { return (
            <div key={n.eventid} className="itemevent">
              { isAuth && <div className="itemevent_header">
                <div className="line"></div>
                <div>
                  <IconButton onClick={removeEvent.bind(this, n.eventid)}> <ClearIcon style={{color:"red"}}/></IconButton>
                </div>
              </div>}
              { !isAuth && <div className="itemevent_header2"></div>}
              <div className="itemevent_content">
                <div className="itemevent_title">
                  <EventNoteIcon className="svgmain" />
                  <div> 
                    <div className="itemevent_title_name">{n.title}</div> 
                    <div className="padevent itemevent_title_date">{moment(n.startDate).format('dddd, D MMMM YYYY')}</div>
                  </div>

                </div>
                <div className="itemevent_time">
                  <svg className="svgall MuiSvgIcon-root makeStyles-icon-1676" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
                  <div className="padevent">
                    {moment(n.startDate).format('HH:mm')}
                    <span> - </span>
                    {moment(n.endDate).format('HH:mm')}
                  </div>
                </div>
                <div className="itemevent_author">
                  <HowToRegIcon className="svgall" />
                  <div className="padevent">{n.person}</div>
                </div>
                <div className="itemevent_room">
                  <RoomIcon className="svgall" />
                  <div className="padevent">{n.location}</div>
                </div>
              </div>
            </div>
          )}) }
      </div> */}
      <div className="top">
        <a href="#up">
          <ExpandLessIcon onClick={scrollTop.bind(this)} className="icon-top" />
        </a>
      </div>
    </>
  );
}
export default Eventlist;