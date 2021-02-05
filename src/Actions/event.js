import { eventlist_no_active, eventlist_old } from "../Reducers/eventReducer";
import API from '../Reducers/API';

export const EventListNoActive = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/calendar_event_new');
            response.data=response.data.map(n => ({
                eventid:n.event_id,
                title: n.event_name,
                startDate:n.event_start,
                endDate:n.event_end,
                location:"Room - "+ n.room_name,
                person:"Author - "+n.person_login,
                conform:n.admin_login,
                color: '#808080'
              }) );
            dispatch(eventlist_no_active(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
export const EventListOld = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/calendar_event_old');
            response.data=response.data.map(n => ({
                eventid:n.event_id,
                title: n.event_name,
                startDate:n.event_start,
                endDate:n.event_end,
                location:"Room - "+ n.room_name,
                person:"Author - "+n.person_login,
                conform:n.admin_login
              }) );
            dispatch(eventlist_old(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}