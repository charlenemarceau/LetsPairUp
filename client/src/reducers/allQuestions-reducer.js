import { GET_ALL_QUESTIONS } from "../actions/question.action";

const initialState = {};

export default function allQuestionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return action.payload
    default: 
      return state;
  }
}