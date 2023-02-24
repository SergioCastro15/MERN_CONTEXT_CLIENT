import axios from 'axios';

const SERVER = 'http://localhost:4000';

export const getPostRequests = async () => {
  const response = await axios.get(`${SERVER}/posts`);
  return response;
}

export const createPostRequest = async (post) => {
  return await axios.post(`${SERVER}/posts`, post)
}

export const deletePostRequest = async (id) => {
  return await axios.delete(`${SERVER}/posts/${id}`)
}

export const getPostOnlyRequest = async (id) => {
  return await axios.get(`${SERVER}/posts/${id}`)
}

export const updatePostRequest = async (id, post) => {
  return axios.put(`${SERVER}/posts/${id}`, post)
}