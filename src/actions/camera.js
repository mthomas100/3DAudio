import { TOGGLE_MINIMIZE, UNTOGGLE_MINIMIZE } from './types';

export const toggleMinimized = (componentName) => dispatch => {
    dispatch({
    type: TOGGLE_MINIMIZE,
    payload: componentName
    });
}

 export const untoggleMinimized = (componentName) => dispatch => {
    dispatch({
    type: UNTOGGLE_MINIMIZE,
    payload: componentName
    });
 }

//template actions/alert.js

// Register User (from actions/auth.js)
// export const register = ({ name, email, password }) => async dispatch => {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };
  
//     const body = JSON.stringify({ name, email, password });
  
//     try {
//       const res = await axios.post('/api/users', body, config);
  
//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: res.data
//       });
  
//       dispatch(loadUser());
//     } catch (err) {
//       const errors = err.response.data.errors;
  
//       if (errors) {
//         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//       }
  
//       dispatch({
//         type: REGISTER_FAIL
//       });
//     }
//   };