import { restApp } from 'app';
import { SubmissionError } from 'redux-form';

const POST_LOAD = 'redux-example/blog/POST_LOAD';
const POST_SUCCESS = 'redux-example/blog/POST_SUCCESS';
const POST_FAIL = 'redux-example/blog/POST_FAIL';

const blogService = restApp.service('blogs');

const initialState = {
  loaded: false
};

const catchValidation = error => {
  if (error.blog) {
    if (error.blog === 'Validation failed' && error.data) {
      throw new SubmissionError(error.data);
    }
    throw new SubmissionError({ _error: error.blog });
  }
  return Promise.reject(error);
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case POST_LOAD:
      return {
        ...state
      };
    case POST_SUCCESS:
      return {
        ...state
      };
    case POST_FAIL:
      return {
        ...state,
        postError: action.error
      };
    default:
      return state;
  }
}

export function post(data) {
  return {
    types: [POST_LOAD, POST_SUCCESS, POST_FAIL],
    promise: () => blogService.create(data).catch(catchValidation)
  };
}
