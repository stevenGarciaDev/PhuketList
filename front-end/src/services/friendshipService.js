import http from "./httpService";

const apiEndpoint = "/friends";

export async function getPotentialFriends(email) {
  const res = await http.get(`${apiEndpoint}/potentialFriends`,{params:email});
  return res.data;
}
export function addUser(email,userid,emailuse){
  return http.put(`${apiEndpoint}/addFriend`,{email,userid,emailuse});
}
export function acceptFriend(email,userid,emailuse){
  return http.put(`${apiEndpoint}/acceptFriend`,{email,userid,emailuse});
}
export async function getFriends(email){
  //console.log(userid);
  return await http.get(`${apiEndpoint}/getFriends`,{params:email});
}
export async function getFriendstatus(email,fremail){
  //console.log(userid);
  let test = await http.get(`${apiEndpoint}/getFriendstatus`,{params:{email,fremail}});
 // console.log(test);
  return test.data;
}
