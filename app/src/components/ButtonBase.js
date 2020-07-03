import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import Sizes from '../../res/styles/Sizes';
import {APP_COLOR} from '../../res/styles/AppStyles';
import Colors from '../../res/styles/Colors';

const POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
};

const ButtonBase = (props) => {
  const {text, style, textStyle, onPress, position, icon, iconStyle} = props;

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[styles.button, style]}>
      {icon && position === POSITION.LEFT && (
        <Icon source={icon} style={iconStyle} />
      )}
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {icon && position === POSITION.RIGHT && (
        <Icon source={icon} style={iconStyle} />
      )}
    </TouchableOpacity>
  );
};

const Icon = (props) => (
  <Image
    resizeMode={'contain'}
    style={[styles.iconStyle, props.style]}
    source={props.source}
  />
);

ButtonBase.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.any,
  style: PropTypes.any,
  disabled: PropTypes.bool,
  position: PropTypes.string,
  icon: PropTypes.any,
  iconStyle: PropTypes.any,
};

ButtonBase.defaultProps = {
  position: POSITION.LEFT,
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: Sizes.width45,
    paddingHorizontal: Sizes.width5,
    backgroundColor: APP_COLOR.PRIMARY,
    borderRadius: Sizes.width45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Sizes.font14,
  },
  iconStyle: {
    marginHorizontal: Sizes.width5,
    width: Sizes.width12,
    height: Sizes.width12,
  },
});

export default ButtonBase;
