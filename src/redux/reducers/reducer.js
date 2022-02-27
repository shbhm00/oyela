import {SET_MOBILE} from '../../actions/actionTypes';

const initialState = {
  mobile: '',
};

export default function (state = initialState, action) {
  console.log('actionnn', action.theme);
  switch (action.type) {
    case SET_MOBILE:
      return {...state, mobile: action.mobile};
    default:
      return state;
  }
}
