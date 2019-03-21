import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name
  });
}

export function getUsers() {
  return http.get(`${apiEndpoint}/publicUsers`);
}

export function getPublicuser(id) {
  return http.get(`${apiEndpoint}/publicUsers/${id}`);
}

export function forgotPassword(user){
  return http.post(`${apiEndpoint}/forgotPassword`,{email: user.email});
}
export function resetPassword(params){
  var tokens = params.params.resetPasswordToken;
  return http.get(`${apiEndpoint}/resetPassword`,{params: {token: tokens}});
}

export async function updateProfile(user, bioText, jwt) {


  const response = await http.put(`${apiEndpoint}/updateProfile/${user.email}`,
    { bioText },
    { 'headers': {'x-auth-token': jwt }
  });
  //console.log(response); //user._id
  return response;
}



export async function getUserBIO(user) {
   var returnBIO = "";

  const bioUser = await http.get(`${apiEndpoint}/UserBio/${user.email}`, {}).then(function(result) {

    returnBIO = result.data[0].bio;

  });

  console.log(returnBIO);



  return returnBIO;
}
