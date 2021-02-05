import{ EVENTLIST_NO_ACTIVE, EVENTLIST_OLD} from '../Constants/Constants';

const defaultState = {
    eventlist_active:[],
    eventlist_old:[]
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case EVENTLIST_NO_ACTIVE:
            return {
                ...state,
                eventlist_active: action.payload,
            }
        case EVENTLIST_OLD:
            return {
                ...state,
                eventlist_old: action.payload,
            }
        default:
            return state
    }
}
export const eventlist_no_active = (data) => ({type: EVENTLIST_NO_ACTIVE, payload: data}) // пометка)
export const eventlist_old = (data) => ({type: EVENTLIST_OLD, payload: data}) // пометка)
