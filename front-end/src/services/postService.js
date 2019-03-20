import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/post";

export function retrieve(post) {
  return http.get(apiEndpoint, {});
}

export async function createPost(text, image) {
  const response = await http.post(`${apiEndpoint}`, {
    text,
    image
  });
  return response;
}

export function edit(post) {

}

export function remove(post) {

}

export function update(post) {

}
