import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const toggleMinimized = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

//template actions/alert.js

// Register User (from actions/auth.js)
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ name, email, password });
  
    try {
      const res = await axios.post('/api/users', body, config);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };