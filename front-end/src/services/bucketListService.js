import http from './httpService';
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bucketList";

export function getListItems(user) {
  return http.get(`${apiEndpoint}/${user._id}`);
}

export function deleteItem(itemId) {

}
