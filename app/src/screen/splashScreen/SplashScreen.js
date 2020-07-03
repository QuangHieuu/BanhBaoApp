import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationService from '../../router/NavigationService';
import {hideLoading, showLoading} from '../../redux/action/LoadingAction';
import SplashScreen from 'react-native-splash-screen';

class Splash extends React.Component {
  render() {
    return <View />;
  }

  componentDidMount() {
    setTimeout(function () {
      NavigationService.reset('Login');
    }, 3000);
  }

  componentWillUnmount() {
    SplashScreen.hide();
  }
}

export default connect(
  (state) => {
    return {
      loading: state.loadingState.loading,
    };
  },
  {showLoading, hideLoading},
)(Splash);
