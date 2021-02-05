import React from 'react'
import './EventList.css';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {EventListNoActive, EventListOld} from '../../../Actions/event'

import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';

const Eventlist = (props) => {

  const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) };
  const dispatch = useDispatch()
  const eventnoactual = useSelector(state => state.event.eventlist_active);
  const eventold = useSelector(state => state.event.eventlist_old);

  React.useEffect(() => { dispatch(EventListNoActive()); 
  }, [dispatch])
  React.useEffect(() => { dispatch(EventListOld()); 
  }, [dispatch])

  const [state, setState] = React.useState({
    search:'',
    displaysearch:false
  });

  const createEvent = () => {
  }

  return (
    <>
      <div className="eventlist-main">
        <div className="eventlist_section_header">
          <div>
            <p>
              Event List&nbsp;
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4C7.448 4 7 4.448 7 5V8C7 8.265 7.105 8.52 7.293 8.707L9.293 10.707C9.488 10.903 9.744 11 10 11C10.256 11 10.512 10.902 10.707 10.707C11.098 10.316 11.098 9.684 10.707 9.293L9 7.586V5C9 4.448 8.552 4 8 4Z" fill="#8492A6"></path><path d="M13.657 2.343C12.145 0.832 10.136 0 8 0C5.863 0 3.854 0.832 2.343 2.343C0.832 3.855 0 5.864 0 8C0 10.137 0.832 12.146 2.343 13.657C2.461 13.775 2.599 13.868 2.724 13.978H1.5C0.948 13.978 0.5 14.425 0.5 14.978C0.5 15.531 0.948 15.978 1.5 15.978H5C5.552 15.978 6 15.531 6 14.978V11.5C6 10.947 5.552 10.5 5 10.5C4.448 10.5 4 10.947 4 11.5V12.447C3.921 12.376 3.833 12.318 3.757 12.242C2.624 11.109 2 9.603 2 8C2 6.398 2.624 4.891 3.757 3.757C4.891 2.624 6.397 2 8 2C9.602 2 11.109 2.624 12.243 3.757C13.376 4.891 14 6.397 14 8C14 9.603 13.376 11.11 12.242 12.243C11.108 13.376 9.602 14 8 14C7.448 14 7 14.447 7 15C7 15.553 7.448 16 8 16C10.136 16 12.145 15.168 13.656 13.656C15.168 12.147 16 10.137 16 8C16 5.863 15.168 3.854 13.657 2.343Z" fill="#8492A6"></path></svg>
            </p>
          </div>
        </div>
      </div>
      <div className="eventlist-search">
        search event
            </div>
      <div className="eventlist-no-active">
        { eventnoactual.length === 0 
          ? <div key='1'>
              empty
            </div>
          : eventnoactual.map(n => { return (
            <div key={n.eventid} className="itemevent">
              <div className="itemevent_header">
                header
              </div>
              <div className="itemevent_content">
                <div className="itemevent_title">
                  {n.title}

                </div>
                <div className="itemevent_time">
                  {n.startDate}
                  {n.endDate}
                </div>
                <div className="itemevent_author">
                  {n.person}
                </div>
                <div className="itemevent_room">
                  {n.location}
                </div>
              </div>
            </div>
          )}) }        
      </div>
      <div className="eventlist-old">
      { eventold.length === 0 
          ? <div key='1'>
              empty
            </div>
          : eventold.map(n => { return (
            <div key={n.eventid} className="itemevent">
              <div className="itemevent_header">
                header
              </div>
              <div className="itemevent_content">
                <div className="itemevent_title">
                  {n.title}

                </div>
                <div className="itemevent_time">
                  {n.startDate}
                  {n.endDate}
                </div>
                <div className="itemevent_author">
                  {n.person}
                </div>
                <div className="itemevent_room">
                  {n.location}
                </div>
              </div>
            </div>
          )}) }
      </div>
      <div className="top">
        <a href="#up">
          <ExpandLessIcon onClick={scrollTop.bind(this)} className="icon-top" />
        </a>
      </div>
    </>
  );
}
export default Eventlist;