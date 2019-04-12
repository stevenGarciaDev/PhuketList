import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/post";

export async function getAllPost(jwt) {
  const response = await http.get(`${apiEndpoint}/activityPage`,
    { 'headers': {'x-auth-token': jwt }
  });
  return response.data;
}

export async function getPosts(taskId, jwt) {
  const response = await http.get(`${apiEndpoint}/${taskId}`, {
    'headers': {'x-auth-token': jwt }
  });
  return response;
}

export async function createPost(text, image, taskId, jwt) {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('image', image);
  formData.append('topicID', taskId);
  const response = await http.post(`${apiEndpoint}/`,
    formData,
    { 'headers': {'x-auth-token': jwt }
  });
  return response.data;
}

export async function updateLikeInfo(likesArr, taskId, jwt) {
  console.log("the likeArr is", likesArr);
  const response = await http.post(`${apiEndpoint}/${taskId}/likes`,
    { likesArr },
    { 'headers': {'x-auth-token': jwt }
  });
  console.log(response);
  return response;
}

export function edit(post) {

}

export function remove(post) {

}

export function update(post) {

}
