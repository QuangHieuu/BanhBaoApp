import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import TextBase from './TextBase';
import PropTypes from 'prop-types';
import NavigationServices from '../router/NavigationService';
import AppStyles from '../../res/styles/AppStyles';
import Sizes from '../../res/styles/Sizes';
import Images from '../../res/styles/Images';

const BackIcon = (props) => {
  const icon = props.icon || Images.back;
  const {tintColor, style, text, onPress} = props;

  const _handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      NavigationServices.back();
    }
  };

  return (
    <TouchableOpacity
      onPress={_handlePress}
      hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
      <View style={[styles.backIconContainer, style]}>
        <Image
          style={[styles.backIcon, {tintColor}]}
          resizeMode="contain"
          source={icon}
        />
        {text && <TextBase style={AppStyles.toolBarText}>{text}</TextBase>}
      </View>
    </TouchableOpacity>
  );
};

BackIcon.propTypes = {
  icon: PropTypes.any,
  tintColor: PropTypes.string,
  style: PropTypes.any,
  text: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  backIcon: {
    width: Sizes.width24,
    height: Sizes.width20,
  },
  backIconContainer: {
    padding: Sizes.width7,
  },
});

export default BackIcon;
