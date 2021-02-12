import { successAddEvent, eventFail, getcalendarneweventex, selectscalendar, selectcalendar, selectrooms, firstcharts, secondcharts, weather } from "../Reducers/otherReducer";
import API from '../Reducers/API';


export const calendarSelect = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/calendarselect');
            response.data=response.data.map(n => ({
                title: n.event_name,
                startDate:n.event_start,
                endDate:n.event_end,
                location:"Room - "+ n.room_name,
                person:"Author - "+n.person_login,
                conform:n.admin_login
              }) );
              for(let i = 0; i < response.data.length; i++) {if(response.data[i].conform == null) { response.data[i].color = '#808080';}else{response.data[i].color = '';}}
            dispatch(selectcalendar(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const sCalendarSelect = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/scalendarselect');
            dispatch(selectscalendar(response.data.reverse()))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getRoomsMap = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/calendarselectroom');
            dispatch(selectrooms(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getCalendarNewEvent = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/calendarnotevent');
            dispatch(getcalendarneweventex(response.data[0].count))
        } catch (e) {
            console.log(e)
        }
    }
}

/* Charts */

export const firstchartfunc = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/room_event');
            response.data=response.data.map(n => ({
                name: n.room_name,
                value: n.countevent
              }) );
            dispatch(firstcharts(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const secondchartfunc = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/room_building');
            response.data=response.data.map(n => ({
                name: "Building "+n.building_number,
                value: n.count
              }) );
            dispatch(secondcharts(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

/* Weather */
export const weatherobj = () => {
    return async dispatch => {
        try {
            const response = await API.get('/api/get/weather');
            dispatch(weather(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

/* ADD EVENT */

export const addevent = (state) => {
    return async dispatch => {
        try {
           await API.post('api/event/createevent', { state });
            //console.log("Add event "+response.data)
            dispatch(successAddEvent('Success'))
            setTimeout(function () { dispatch(successAddEvent('')) }, 2500)
        } catch (error) {
            dispatch(eventFail(error.response.data.message));
            setTimeout(function () { dispatch(eventFail('')) }, 2500)

            //dispatch(loginFail(error.response.data.message))
            //console.log(error.response.data.message)
        }
    }
}
/* ADD ROOM */

export const addroom = (state) => {
    return async dispatch => {
        try {
            await API.post('api/event/createroom', { state });
            dispatch(successAddEvent('Success'))
            setTimeout(function () { dispatch(successAddEvent('')) }, 2500)
        } catch (error) {
            //console.log(error.response.data.message)
            dispatch(eventFail(error.response.data.message));
            setTimeout(function () { dispatch(eventFail('')) }, 2500)

            //dispatch(loginFail(error.response.data.message))
            //console.log(error.response.data.message)
        }
    }
}
