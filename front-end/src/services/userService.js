import http from "./httpService";
import { apiUrl } from "../config.json";
import { join } from "path";

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
  const response = await http.post(`${apiEndpoint}/updateProfile/${user._id}`,
    { bioText },
    { 'headers': {'x-auth-token': jwt }
  });

  return response;
}






