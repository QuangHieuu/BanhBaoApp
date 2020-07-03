import Colors from './Colors';
import Sizes from './Sizes';
import {StyleSheet} from 'react-native';

export const APP_COLOR = {
  PRIMARY: Colors.blue,
  BACKGROUND: Colors.grey93,
  LOADING_BACKGROUND: Colors.grey33,
  TOOL_BAR: Colors.blue,
  STATUS_BAR: Colors.blue3,
  STATUS_BAR_OVERLAY: Colors.blue4,
  BOTTOM_TAB_BAR: Colors.grey85,
  ACTIVE_BOTTOM_TAB: Colors.blue,
  INACTIVE_BOTTOM_TAB: Colors.grey50,
  OVERLAY: Colors.overlay,
  TEXT: Colors.black,
  TITLE: Colors.blue,
};

export const APP_SIZE = {
  TEXT: Sizes.font14,
  TITLE: Sizes.font16,
  DIALOG_WIDTH: Sizes.width263,
};

const AppStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: APP_COLOR.STATUS_BAR,
  },
  statusBar: {
    flex: 0,
    backgroundColor: APP_COLOR.STATUS_BAR,
  },
  toolBarText: {
    color: Colors.white,
    fontSize: Sizes.font18,
    fontWeight: 'bold',
  },
});

export default AppStyles;
