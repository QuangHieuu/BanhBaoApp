import DialogManager, {
  ScaleAnimation,
} from '../../../libraries/react-native-dialog-component/src';
import {StyleSheet, Keyboard} from 'react-native';
import React from 'react';
import DialogBase from '../components/DialogBase';
import {DIALOG_TYPE} from '../components/DialogBase';
import {APP_SIZE} from '../../res/styles/AppStyles';
import Sizes from '../../res/styles/Sizes';

export default class DialogUtil {
  static dialogShown = false;

  static showConfirmDialog({
    type = [],
    title,
    content,
    confirmText,
    rejectText,
    onConfirmClick,
    onRejectClick,
  }) {
    DialogUtil.showDialog(
      styles.dialogStyle,
      APP_SIZE.DIALOG_WIDTH,
      <DialogBase
        type={[DIALOG_TYPE.CONFIRM, ...type]}
        title={title}
        content={content}
        confirmText={confirmText}
        rejectText={rejectText}
        onConfirmClick={() => {
          this.dialogShown = false;
          if (onConfirmClick) {
            onConfirmClick();
          }
        }}
        onRejectClick={() => {
          this.dialogShown = false;
          if (onRejectClick) {
            onRejectClick();
          }
        }}
      />,
    );
  }

  static showMessageDialog({
    type = [],
    title,
    content,
    confirmText,
    onConfirmClick,
  }) {
    Keyboard.dismiss();
    DialogUtil.showDialog(
      styles.dialogStyle,
      APP_SIZE.DIALOG_WIDTH,
      <DialogBase
        type={[DIALOG_TYPE.MESSAGE, ...type]}
        title={title}
        content={content}
        confirmText={confirmText}
        onConfirmClick={() => {
          this.dialogShown = false;
          if (onConfirmClick) {
            onConfirmClick();
          }
        }}
      />,
    );
  }

  static showUnDismissedDialog({
    type = [],
    title,
    content,
    confirmText,
    onConfirmClick,
  }) {
    Keyboard.dismiss();
    if (this.dialogShown) {
      DialogManager.update({
        children: (
          <DialogBase
            type={[DIALOG_TYPE.UNDISMISS, ...type]}
            title={title}
            content={content}
            confirmText={confirmText}
            onConfirmClick={() => {
              // if (type === aaa) this.dialogShown = false;
              if (onConfirmClick) {
                onConfirmClick();
              }
            }}
          />
        ),
      });
    }
    this.dialogShown = true;
    DialogManager.show({
      animationDuration: 0,
      dismissOnHardwareBackPress: false,
      dismissOnTouchOutside: false,
      width: APP_SIZE.DIALOG_WIDTH,
      ScaleAnimation: new ScaleAnimation(),
      dialogStyle: styles.dialogStyle,
      children: (
        <DialogBase
          type={[DIALOG_TYPE.UNDISMISS, ...type]}
          title={title}
          content={content}
          confirmText={confirmText}
          onConfirmClick={() => {
            // if (type === aaa) this.dialogShown = false;
            if (onConfirmClick) {
              onConfirmClick();
            }
          }}
        />
      ),
    });
  }

  static showDialog(dialogStyle, width, dialog) {
    if (this.dialogShown) {
      return;
    }
    this.dialogShown = true;
    DialogManager.show({
      animationDuration: 0,
      onDismissed: () => (this.dialogShown = false),
      width: width || APP_SIZE.DIALOG_WIDTH,
      ScaleAnimation: new ScaleAnimation(),
      dialogStyle: dialogStyle || styles.dialogStyle,
      children: dialog,
    });
  }

  static dismiss() {
    DialogManager.dismiss();
  }
}

const styles = StyleSheet.create({
  dialogStyle: {
    borderRadius: Sizes.width10,
    alignItems: 'center',
  },
});
