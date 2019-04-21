import http from "./httpService";

const apiEndpoint = "/post";

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
  let uploadData = new FormData();
  uploadData.append('upload_preset', 'phuketlist');
  uploadData.append('file', image);
  uploadData.append('api_key', "771354541174957");
  const endpoint = "https://api.cloudinary.com/v1_1/phuketlist/image/upload";

  try {
    console.log("about to send post");
    const res = await http.post(endpoint, uploadData);
    console.log('response is ', res.data.secure_url);
    image = res.data.secure_url;
  } catch (e) {
    console.log(e);
  }

  const response = await http.post(`${apiEndpoint}/`,
    { text, image, topicID: taskId },
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

export async function report(taskId, jwt) {
  const response = await http.put(`${apiEndpoint}/reportPost/${taskId}`,

  { 'headers': {'x-auth-token': jwt }
  });

  return response;
}

export async function getIsAppropriate(taskId, jwt) {
  var IsAppro = true;

  await http.get(`${apiEndpoint}/getIsAppropriate/${taskId}`, {}).then(function(result) {

    IsAppro = result.data;
 });




 return IsAppro;
}
