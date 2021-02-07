import { eventlist_no_active, eventlist_old } from "../Reducers/eventReducer";
import { successAddEvent, eventFail } from "../Reducers/otherReducer";

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
export const operationRemove = (state) => {
    return async dispatch => {
        try {
            await API.post('api/get/event_remove', { state });
            dispatch(successAddEvent('Success'))
            setTimeout(function () { dispatch(successAddEvent('')) }, 111500)
            //dispatch(setUser(response.data.user))
        } catch (error) {
            dispatch(eventFail(error.response.data.message));
            setTimeout(function () { dispatch(eventFail('')) }, 2500)
            //console.log(error.response.data.message)
        }
    }
}
export const operationOk = (state) => {
    return async dispatch => {
        try {
            await API.post('api/get/event_ok', { state });
            dispatch(successAddEvent('Success'))
            setTimeout(function () { dispatch(successAddEvent('')) }, 2500)
            //dispatch(setUser(response.data.user))
        } catch (error) {
            dispatch(eventFail(error.response.data.message));
            setTimeout(function () { dispatch(eventFail('')) }, 2500)
            //console.log(error.response.data.message)
        }
    }
}