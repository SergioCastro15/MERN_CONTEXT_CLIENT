import { createContext, useContext, useReducer } from 'react';
import { 
  getPostRequests, 
  createPostRequest, 
  deletePostRequest, 
  getPostOnlyRequest,
  updatePostRequest
 } from '../api/posts';
import { postReducer } from './reducer'

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);

  return context;
}

export const PostProvider = ({ children }) => {
  const initialState = {
    posts: [],
    post: {
      title: '',
      description: ''
    },
  }

  const [state, dispatch] = useReducer(postReducer, initialState);

  const getPosts = async () => {
    const res = await getPostRequests();
    const { data } = res;
    dispatch({ type: 'GET_POSTS', payload: data });
  };

  const getPost = async (id) => {
    const res = await getPostOnlyRequest(id);
    const { data } = res;
    dispatch({ type: 'GET_POST', payload: data });
  }

  const createPost = async (values) => {
    await createPostRequest(values);
    dispatch({ type: 'POST_POSTS', payload: values });
  }

  const deletePost = async (id) => {
    await deletePostRequest(id);
    dispatch( {type: 'DELETE_POSTS', payload: id} );
  }

  const updatePost = async(id, post) => {
    await updatePostRequest(id, post)
    dispatch( {type: 'UPDATE_POSTS', payload: { id, post }} );
  }

  return (
    <postContext.Provider value={{
      posts: state.posts,
      post: state.post,
      getPosts,
      createPost,
      deletePost,
      getPost,
      updatePost
    }}>
      { children }
    </postContext.Provider>
  )
}