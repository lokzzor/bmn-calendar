import React from 'react'
import './SmallCalendar.css';

import moment from "moment";
import ListItem from "@material-ui/core/ListItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Eventcal } from "../../Functions/AddEvent/AddEvent"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { sCalendarSelect } from '../../../Actions/simpleget'
import { useDispatch, useSelector } from 'react-redux';

const Smcalendar = () => {
    const dispatch = useDispatch();
    const selectscall = useSelector(state => state.other.selectscall);
    React.useEffect(() => { dispatch(sCalendarSelect()); 
    }, [dispatch])

    const [showModal, setShowModal] = React.useState(false);
    const openModal = () => { setShowModal(!showModal)} 

    return (
        <>
            <div className="scalendar-box">
                <h2 className="scalendar-box-title cursor"> {moment(new Date()).format("dddd")} </h2>
                <div className="small-calendar-day cursor">
                    {moment(new Date()).format("DD")}
                </div>
                <div className="small-calendar-eventlist">
                <span className="layer cursor">Curent Event:</span>
                    <ol className="color-with-svg">
                        { selectscall.length === 0 
                        ? <li className="listli"  key='1'><DonutLargeIcon className="colorcircle"/><span className="small-calendar-titleevent">There are no scheduled events today</span></li> 
                        : selectscall.slice(0, 3).map(n => { return <li className="listli" key={n.event_id} ><DonutLargeIcon className="colorcircle"/><span className="small-calendar-titleevent">{n.event_name}</span></li> })}
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