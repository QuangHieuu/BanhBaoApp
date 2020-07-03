import {ACTION} from '../index';

const loadingState = {
  loading: false,
};

export const LoadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case ACTION.ACTION_SHOW_LOADING:
      return {...state, loading: true};
    case ACTION.ACTION_HIDE_LOADING:
      return {...state, loading: false};
    default:
      return state;
  }
};
