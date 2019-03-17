import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/posts";

export function retrieve(post) {
  return http.get(apiEndpoint, {});
}

export function createPost(text, photo) {
  return http.post(apiEndpoint, {

  });
}

export function edit(post) {

}

export function delete(post) {

}

export function update(post) {

}
