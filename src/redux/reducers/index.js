import { SET_NATIONALITY } from "../action-types";
const initialState = {
  nationality: 'CH'
};
function rootReducer(state = initialState, action) {
  if (action.type === SET_NATIONALITY) {
    return Object.assign({}, state, {
      nationality: action.payload
    });
  }
  return state;
}
export default rootReducer;