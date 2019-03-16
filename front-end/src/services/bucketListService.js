import http from './httpService';
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bucketList";
const apiEndpointListItems = apiUrl + "/ListItem";

export async function getListItems(user, jwt) {
  const response = await http.get(`${apiEndpoint}/${user._id}`,
     { 'headers': {'x-auth-token': jwt } });
  return response;
}

export async function getLikeTasks(item) {
  const response = await http.get(`${apiEndpointListItems}/task?q=${item}`);
  return response;
}

export async function findOrCreateTask(user, name, jwt) {
  const response = await http.post(`${apiEndpoint}/${user._id}`,
    { taskName: name },
    { 'headers': {'x-auth-token': jwt }
  });
  return response;
}

export async function removeTask(user, item, jwt) {
  const response = await http.post(`${apiEndpoint}/remove/${user._id}`,
    {
      item: item,
    },
    { 'headers': {'x-auth-token': jwt }
  });

  return response;
}

export async function toggleComplete(user, item, jwt) {
  const response = await http.put(`${apiEndpoint}/${user._id}`,
    {
      item: item
    }, { 'headers': {'x-auth-token': jwt }
  });

  return response;
}

export async function updateTask(user, item, newText, jwt) {
  const response = await http.post(`${apiEndpoint}/update/${user._id}`,
    { item, newText },
    { 'headers': {'x-auth-token': jwt }
  });

  return response;
}
