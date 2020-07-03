import {ACTION} from '../index';

export const showLoading = () => {
  return {type: ACTION.ACTION_SHOW_LOADING};
};

export const hideLoading = () => {
  return {type: ACTION.ACTION_HIDE_LOADING};
};
