import http from "./httpService";
import jwtDecode from 'jwt-decode';

//const apiEndpoint = apiUrl + "/auth";
const apiEndpoint = "/auth";

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    return user;
  }
  catch (ex) {
    return null;
  }
}


export function refreshCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    return user;
  }
  catch (ex) {
    return null;
  }
}

export function getBucketList(user) {
  return http.get(`${apiEndpoint}/${user._id}`);
}
