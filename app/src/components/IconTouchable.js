import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Sizes from '../../res/styles/Sizes';

const IconTouchable = (props) => {
  const {onPress, style, source, resizeMode} = props;

  return (
    <TouchableOpacity
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      onPress={onPress}>
      <Image
        {...props}
        source={source}
        resizeMode={resizeMode || 'contain'}
        style={[styles.icon, style]}
      />
    </TouchableOpacity>
  );
};

IconTouchable.propTypes = {
  source: PropTypes.any.isRequired,
  onPress: PropTypes.any.isRequired,
  style: PropTypes.any,
  resizeMode: PropTypes.any,
};

const styles = StyleSheet.create({
  icon: {
    height: Sizes.width20,
    width: Sizes.width20,
  },
});

export default IconTouchable;
