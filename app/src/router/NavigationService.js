import {
  CommonActions,
  StackActions,
  DrawerActions,
} from '@react-navigation/native';

let _navigator;

const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
};

const push = (routeName, params) => {
  _navigator.dispatch(
    StackActions.push({
      name: routeName,
      params,
    }),
  );
};

const back = () => {
  _navigator.dispatch(CommonActions.goBack());
};

const replace = (routeName, params) => {
  _navigator.dispatch(
    StackActions.replace({
      name: routeName,
      params,
    }),
  );
};

const reset = (routeName, params) => {
  _navigator.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: routeName, params}],
    }),
  );
};

const toggleDrawer = () => {
  _navigator.dispatch(DrawerActions.toggleDrawer());
};

const openDrawer = () => {
  _navigator.dispatch(DrawerActions.openDrawer());
};

const closeDrawer = () => {
  _navigator.dispatch(DrawerActions.closeDrawer());
};

export default {
  setTopLevelNavigator,
  navigate,
  push,
  back,
  reset,
  replace,
  openDrawer,
  toggleDrawer,
  closeDrawer,
};
