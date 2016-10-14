import { 
  GET_USER_INFO,
} from '../../constants'

const initialState = {
  token: null,
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return Object.assign({}, state, {
        token: action.json,
      });
    default:
      return state;
  }
}
