import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import TextBase from './TextBase';

const TextTouchable = (props) => {
  const {
    text,
    style,
    onPress,
    disabled,
    hitSlop = {top: 10, bottom: 10, left: 10, right: 10},
    hitSlopDisable,
    textContainerStyle,
  } = props;

  return (
    <TouchableOpacity
      style={textContainerStyle}
      onPress={onPress}
      disabled={disabled}
      hitSlop={
        hitSlopDisable ? {top: 0, bottom: 0, left: 0, right: 0} : hitSlop
      }>
      <TextBase {...props} onPress={null} style={style}>
        {text}
      </TextBase>
    </TouchableOpacity>
  );
};

TextTouchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.any,
  textContainerStyle: PropTypes.any,
  hitSlopDisable: PropTypes.bool,
  hitSlop: PropTypes.any,
  disabled: PropTypes.bool,
};

export default TextTouchable;
