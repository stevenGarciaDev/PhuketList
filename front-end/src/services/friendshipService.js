import http from "./httpService";

const apiEndpoint = "/friends";

export async function getPotentialFriends() {
  const res = await http.get(`${apiEndpoint}/potentialFriends`);
  return res.data;
}
