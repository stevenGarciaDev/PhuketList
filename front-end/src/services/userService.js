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
  return http.get(`${apiEndpoint}/publicUsers`, {});
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




