import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';


//Get all unique userId's from list of posts, iterate over unique userids and fetch user for each userid

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
 
 //Action Creators inside an Action Creator
    await dispatch(fetchPosts());

   const userIds = _.uniq( _.map(getState().posts,'userId'));
   userIds.forEach(id => dispatch(fetchUser(id))); 
 };


//Action Creator returning a function using Redux-Thunk
export const fetchPosts =  () => async dispatch => {

const response =  await jsonPlaceholder.get('/posts');

dispatch({type: 'FETCH_POSTS', payload: response.data})
 
 };

export const fetchUser = id => async dispatch => {

   const response =  await jsonPlaceholder.get(`/users/${id}`);
   dispatch({type: 'FETCH_USER', payload: response.data});
};


