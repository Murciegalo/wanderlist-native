import axios from 'axios';
import { Alert } from 'react-native';
import { REACT_APP_API_URL } from 'react-native-dotenv';

// Fetch authenticated user action creators
export const fetchUserPending = () => ({type: "FETCH_USER_PENDING"})
export const fetchUserFulfilled = user => ({type: "FETCH_USER_FULFILLED", user})
export const fetchUserRejected = () => ({type: "FETCH_USER_REJECTED"})

// GET requests the Django REST API, which returns authenticated user object.
export const fetchUser = token => {
  return dispatch => {
    dispatch(fetchUserPending());
    axios.get(`${REACT_APP_API_URL}/api/v1/rest-auth/user/`, 
      {
        headers: { 'Authorization': `Token ${token}`}
      })
        .then(response => {
          const user = response.data;
          dispatch(fetchUserFulfilled(user));
        })
        .catch(err => {
          dispatch(fetchUserRejected());
          let error = '';
          Object.keys(err.response.data).map(message => {
            switch(message) {
              // Invalid token error.
              case 'detail': {
                return error += `${err.response.data[message]}\n`
              }
              default: return error += `${message}: ${err.response.data[message]}\n`
            }
          });
          Alert.alert('Error', error);
        })
  }
}