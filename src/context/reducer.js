
export const postReducer = (state, action) => {
  switch(action.type) {
    case 'GET_POSTS': 
      return {
        ...state,
        posts: action.payload
      };
      
    case 'POST_POSTS': 
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case 'DELETE_POSTS': 
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    case 'GET_POST': 
      return {
        ...state,
        post: action.payload
      }
    case 'UPDATE_POSTS': 
      const {id, post: value} = action.payload
      return {
        ...state,
        post: state.posts.map(post => post._id === id ? value : post)
      }
    default: return null;
  }
} 