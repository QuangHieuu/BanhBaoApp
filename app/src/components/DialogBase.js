import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import DialogManager from '../../../libraries/react-native-dialog-component/src';
import TextBase from './TextBase';
import Sizes from '../../res/styles/Sizes';
import {APP_SIZE} from '../../res/styles/AppStyles';
import Colors from '../../res/styles/Colors';

export const DIALOG_TYPE = {
  MESSAGE: 'MESSAGE',
  CONFIRM: 'CONFIRM',
  SCROLL_MESSAGE: 'SCROLL_MESSAGE',
  UNDISMISS: 'UNDISMISS',
};

const DialogBase = (props) => {
  const {rejectText, confirmText, title, content, type} = props;

  const _onConfirmClick = () => {
    const {onConfirmClick} = props;
    DialogManager.dismiss();
    if (onConfirmClick) {
      onConfirmClick();
    }
  };

  const _onRejectClick = () => {
    const {onRejectClick} = props;
    DialogManager.dismiss();
    if (onRejectClick) {
      onRejectClick();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {title && <Title title={title} />}
        {type.includes(DIALOG_TYPE.SCROLL_MESSAGE) ? (
          <ScrollMessage content={content} />
        ) : (
          <TextBase multiline style={styles.contentText}>
            {content}
          </TextBase>
        )}
      </View>
      {!type.includes(DIALOG_TYPE.UNDISMISS) && (
        <ConfirmContainer
          type={type}
          confirmText={confirmText}
          rejectText={rejectText}
          onConfirmClick={_onConfirmClick}
          onRejectClick={_onRejectClick}
        />
      )}
    </View>
  );
};

const ScrollMessage = (props) => (
  <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
    <TextBase multiline style={[styles.contentText, styles.textStart]}>
      {props.content}
    </TextBase>
  </ScrollView>
);

const Title = (props) => (
  <TextBase multiline style={styles.titleText}>
    {props.title}
  </TextBase>
);

const ConfirmContainer = (props) => (
  <>
    <View style={styles.verticalSeparator} />
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={styles.actionWrapper}
        onPress={props.onConfirmClick}>
        <TextBase multiline style={styles.actionText}>
          {props.confirmText}
        </TextBase>
      </TouchableOpacity>
      {props.type.includes(DIALOG_TYPE.CONFIRM) && (
        <RejectButton
          onRejectClick={props.onRejectClick}
          rejectText={props.rejectText}
        />
      )}
    </View>
  </>
);

const RejectButton = (props) => (
  <>
    <View style={styles.horizontalSeparator} />
    <TouchableOpacity
      style={styles.actionWrapper}
      onPress={props.onRejectClick}>
      <TextBase multiline style={styles.actionText}>
        {props.rejectText}
      </TextBase>
    </TouchableOpacity>
  </>
);

DialogBase.propTypes = {
  type: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  rejectText: PropTypes.string,
  onConfirmClick: PropTypes.func,
  onRejectClick: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  scrollWrapper: {
    maxHeight: Sizes.width188,
    marginBottom: Sizes.width15,
  },
  contentWrapper: {
    paddingHorizontal: Sizes.width12,
    paddingVertical: Sizes.width15,
    alignItems: 'center',
  },
  titleText: {
    fontSize: Sizes.font16,
    fontWeight: 'bold',
    marginBottom: Sizes.width10,
  },
  contentText: {
    fontSize: Sizes.font14,
    marginBottom: Sizes.width3,
    textAlign: 'center',
  },
  textStart: {
    textAlign: 'left',
  },
  actionContainer: {
    flexDirection: 'row',
  },
  verticalSeparator: {
    height: 1,
    width: APP_SIZE.DIALOG_WIDTH - 8,
    backgroundColor: Colors.greyd,
  },
  horizontalSeparator: {
    width: 1,
    backgroundColor: Colors.greyd,
  },
  actionWrapper: {
    flex: 1,
    padding: Sizes.width15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: Sizes.width14,
  },
});

export default DialogBase;
