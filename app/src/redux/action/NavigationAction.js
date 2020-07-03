import {ACTION} from '../index';

export const onChangeNavigation = (navigationRoute) => {
  return {
    type: ACTION.ACTION_CHANGE_NAVIGATION,
    payload: {
      navigationRoute,
    },
  };
};
