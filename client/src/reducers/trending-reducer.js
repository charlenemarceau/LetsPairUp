import { GET_TREND } from "../actions/post.actions";

const initialState = {};

export default function trendingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TREND:
      return action.payload;
    default:
      return state;
  }
}