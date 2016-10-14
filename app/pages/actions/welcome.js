import XHR from '../components/XHR'

import { GET_USER_INFO } from '../../constants'

function receiveUserInfo(json) {
  return {
    type: GET_USER_INFO,
    json,
    receivedAt: Date.now()
  };
}

export function getUserInfo() {
  return dispatch => {
    XHR({
      url:'',
      method: "get",
      success: (data) => {
        dispatch(receiveUserInfo(data))
      },
      error:function(){
        dispatch(receiveUserInfo([]));
      }
    });
  }
}