import http from "./httpService";

const apiEndpoint = "/messages";

export async function createNewGroup(members) {
  console.log("new group to make is with ", members);
  const response = await http.post(`${apiEndpoint}/newGroup`, { members });
  console.log("** response ** ", response);
  return response;
}

export async function retrieveMessageGroups(user) {
  const response = await http.get(`${apiEndpoint}/retrieveMessageGroups/${user._id}`);
  //console.log("the response is ", response);
  return response;
}

export async function getMostRecentMessage(groupId) {
  //console.log('groupId', groupId);
  const response = await http.get(`${apiEndpoint}/getMostRecentMessage/${groupId}`);
  //console.log("^the response is ", response);
  return response;
}

export async function getMessageFeedData(group) {
  //console.log("about to make request", group);
  const response = await http.get(`${apiEndpoint}/populateFeed/${group._id}`);
  console.log("^about to get the response is ", response);

  // traverse through response.data
  for (let i = 0; i < response.data.messages.length; i++) {
    // find the id based for each message in messages
    const userId = response.data.messages[i]['_id'];

    let userInfo;
    for (let n = 0; n < response.data.members.length; n++) {
      if ( response.data.members[n]['_id'] === userId ) {
        userInfo = response.data.members[n];
      }
    }

    //console.log("%%%Current info", response.data.messages[i]);
    response.data.messages[i]['name'] = userInfo.name;
    response.data.messages[i]['photo'] = userInfo.photo;
    //console.log("%%%Current info", response.data.messages[i].message);
  }
  return response;
}
