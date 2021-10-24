import { DELETE_PIN, GET_PINS } from "../actions/pin.actions"
const initialState = {};

export default function pinReducer(state = initialState, action) {
    switch(action.type) {
        case GET_PINS:
            return action.payload;
        case DELETE_PIN: 
            return state.filter((post) => post._id !== action.payload.pinId);
        default:
            return state;
    }
}