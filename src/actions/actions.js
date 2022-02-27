import {SET_MOBILE} from './actionTypes';

export const mobileNumber = mobile => {
  return dispatch => {
    dispatch({
      type: SET_MOBILE,
      mobile: mobile,
    });
  };
};
