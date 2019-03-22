import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/comment";

export async function createComment(text, postId, jwt) {
  const response = http.post(`${apiEndpoint}/${postId}`,
    { text },
    { 'headers': {'x-auth-token': jwt }
  });
  console.log("RESPONES", response);
  return response;
}
