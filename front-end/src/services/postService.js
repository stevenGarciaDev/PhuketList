import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/post";

export async function getPosts(task, jwt) {
  console.log("the topic being sent is ", task);
  console.log("the topic being sent is ", task.taskId);
  const response = await http.get(`${apiEndpoint}/${task.taskId}`);
  console.log("response", response);
  return response;
}

export async function createPost(text, image, taskId, jwt) {
  const response = await http.post(`${apiEndpoint}/`,
    {text, image, topicID: taskId },
    { 'headers': {'x-auth-token': jwt }
  });
  console.log('after response attempt');
  return response;
}

export function edit(post) {

}

export function remove(post) {

}

export function update(post) {

}
