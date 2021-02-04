import { SUCCESS_EVENT, CHANGE_PERSON_FAIL, ADD_PERSON_FAIL, ADD_ROOM_FAIL, ADD_EVENT_FAIL, SET_SECOND_CHART, SET_FIRST_CHART, SET_CALENDAR_NEW_EVENT, WEATHER, SET_SEL_ROOMS,SET_SEL_CALENDAR,SET_SEL_SCALENDAR } from '../Constants/Constants'

const defaultState = {
    weather:[],
    countnewevent: [],
    rooms:[],
    selectcall:[],
    selectscall:[],
    firstchart:[],
    secondchart:[],
    errors:{},
    success:{}
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CALENDAR_NEW_EVENT:
            return {
                ...state,
                countnewevent: action.payload
            }
        case SUCCESS_EVENT:
            return {
                ...state,
                success: action.payload
            }
        case ADD_EVENT_FAIL:
        case ADD_ROOM_FAIL:
        case ADD_PERSON_FAIL:
        case CHANGE_PERSON_FAIL:
            return {
                ...state,
                errors: action.payload,
            }
        case SET_FIRST_CHART:
            return {
                ...state,
                firstchart: action.payload
            }
        case SET_SECOND_CHART:
            return {
                ...state,
                secondchart: action.payload
            }
        case WEATHER:
            return {
                ...state,
                weather: action.payload
            }
        case SET_SEL_CALENDAR:
            return {
                ...state,
                selectcall: action.payload
            }
        case SET_SEL_SCALENDAR:
            return {
                ...state,
                selectscall: action.payload
        }    
        case SET_SEL_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        default:
            return state
    }
}
export const successAddEvent = (success) => ({type: SUCCESS_EVENT, payload: success})

export const eventFail = (errors) => ({type: ADD_EVENT_FAIL, payload: errors})
export const roomFail = (errors) => ({type: ADD_ROOM_FAIL, payload: errors})
export const personFail = (errors) => ({type: ADD_PERSON_FAIL, payload: errors})
export const changepassFail = (errors) => ({type: CHANGE_PERSON_FAIL, payload: errors})

export const selectscalendar = scalendar => ({type: SET_SEL_SCALENDAR, payload: scalendar})
export const selectcalendar = calendar => ({type: SET_SEL_CALENDAR, payload: calendar})
export const selectrooms = rooms => ({type: SET_SEL_ROOMS, payload: rooms})
export const getcalendarneweventex = getnewevent => ({type: SET_CALENDAR_NEW_EVENT, payload: getnewevent})
export const firstcharts = firstchart => ({type: SET_FIRST_CHART, payload: firstchart})
export const secondcharts = secondchart => ({type: SET_SECOND_CHART, payload: secondchart})
export const weather = weathers => ({type: WEATHER, payload: weathers})
