import React from 'react';
import {Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Sizes from '../../res/styles/Sizes';

const IconBase = (props) => {
  const {style, source, resizeMode} = props;

  return (
    <Image
      {...props}
      source={source}
      resizeMode={resizeMode || 'contain'}
      style={[styles.icon, style]}
    />
  );
};

IconBase.propTypes = {
  source: PropTypes.any.isRequired,
  style: PropTypes.any,
  resizeMode: PropTypes.any,
};

const styles = StyleSheet.create({
  icon: {
    height: Sizes.height10,
    width: Sizes.width10,
  },
});

export default IconBase;
