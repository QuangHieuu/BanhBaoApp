import React from 'react';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import Images from '../../res/styles/Colors';

const FetchImage = (props) => {
  const {uri} = props;
  return uri ? <SourceImage {...props} /> : <PlaceHolderImage {...props} />;
};

const PlaceHolderImage = (props) => {
  const {style, resizeMode, placeholder} = props;
  const source = placeholder || Images.placeholder;
  return (
    <Image resizeMode={resizeMode || 'cover'} style={style} source={source} />
  );
};

const SourceImage = (props) => {
  const {uri, style, resizeMode, priority, onLoadEnd} = props;
  return (
    <FastImage
      {...props}
      style={style}
      onLoad={this.onLoad}
      source={{
        uri: uri,
        priority: priority,
      }}
      resizeMode={resizeMode}
      onLoadEnd={onLoadEnd}
    />
  );
};

FetchImage.propTypes = {
  uri: PropTypes.string.isRequired,
  resizeMode: PropTypes.any,
  placeholder: PropTypes.any,
  onLoadEnd: PropTypes.any,
  style: PropTypes.any,
};

export default FetchImage;
