import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {APP_COLOR, APP_SIZE} from '../../res/styles/AppStyles';

const TextBase = (props) => {
  const {style, allowFontScaling, multiline, numberOfLines} = props;

  return (
    <Text
      {...props}
      allowFontScaling={allowFontScaling || false}
      numberOfLines={multiline ? numberOfLines : 1}
      style={[styles.text, style]}>
      {props.children}
    </Text>
  );
};

TextBase.propTypes = {
  style: PropTypes.any,
  allowFontScaling: PropTypes.bool,
  ellipsizeMode: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

const styles = StyleSheet.create({
  text: {
    flexShrink: 1,
    fontSize: APP_SIZE.TEXT,
    color: APP_COLOR.TEXT,
  },
});

export default TextBase;
