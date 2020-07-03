import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Sizes from '../../res/styles/Sizes';
import {APP_COLOR, APP_SIZE} from '../../res/styles/AppStyles';
import Colors from '../../res/styles/Colors';

const TextInputBase = (props) => {
  const {
    style,
    allowFontScaling,
    autoCapitalize,
    autoCorrect,
    borderEnable,
    multiline,
    onChangeText,
    value,
  } = props;
  const textInputStyle = [
    style,
    multiline && styles.verticalTop,
    borderEnable && styles.border,
  ];
  const [inputValue, onChangeValue] = React.useState('');

  const handleOnChangeText = (text) => {
    onChangeValue(text);
    onChangeText && onChangeText(text);
  };

  return (
    <TextInput
      {...props}
      style={[styles.textInput, ...textInputStyle]}
      allowFontScaling={allowFontScaling || false}
      autoCapitalize={autoCapitalize || 'none'}
      autoCorrect={autoCorrect || false}
      underlineColorAndroid={'transparent'}
      multiline={multiline || false}
      onChangeText={handleOnChangeText}
      value={value || inputValue}
    />
  );
};

TextInputBase.propTypes = {
  allowFontScaling: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  borderEnable: PropTypes.bool,
  defaultValue: PropTypes.string,
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onChangeText: PropTypes.func,
  onContentSizeChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  returnKeyLabel: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  underlineColorAndroid: PropTypes.string,
  style: PropTypes.any,
  value: PropTypes.string,
};

const styles = StyleSheet.create({
  textInput: {
    height: Sizes.width40,
    width: '90%',
    color: APP_COLOR.TEXT,
    fontSize: APP_SIZE.TEXT,
    paddingVertical: 0,
  },
  border: {
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: Sizes.width20,
  },
  verticalTop: {
    textAlignVertical: 'top',
  },
});

export default TextInputBase;
