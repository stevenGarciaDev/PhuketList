import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/comment";

export async function createComment(text, postId, jwt) {
  const response = await http.post(`${apiEndpoint}/${postId}`,
    { text },
    { 'headers': {'x-auth-token': jwt }
  });
  return response;
}
