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

export async function updateProfile(user, bio, bioText, jwt) {
  const response = await http.post(`${apiEndpoint}/update/${user._id}`,
    { bio: bioText },
    { 'headers': {'x-auth-token': jwt }
  });

  return response;
}



export async function updateProfile2(user, bio, bioText, jwt) {
  return http.put(apiEndpoint, {
    bio: bioText
  });
}


export async function updateTask(user, item, newText, jwt) {
  const response = await http.post(`${apiEndpoint}/update/${user._id}`,
    { item, newText },
    { 'headers': {'x-auth-token': jwt }
  });

  return response;
}