import React, {Component} from 'react';
import {StatusBar, BackHandler, SafeAreaView} from 'react-native';
import LoadingView from './components/LoadingView';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import NavigationServices from './router/NavigationService';
import {AppRouter} from './router/AppRouter';
import {onChangeNavigation} from './redux/action/NavigationAction';
import Colors from '../res/styles/Colors';

class App extends Component {
  constructor(props) {
    super(props);
  }

  _handleNavigationChange = (prevState, newState) => {
    const prevRoute = _getRoute(prevState);
    const currentRoute = _getRoute(newState);
    if (prevRoute !== currentRoute) {
      this.props.onChangeNavigation({prevRoute, currentRoute});
    }
  };

  render() {
    return (
      <>
        <SafeAreaView />
        <StatusBar
          backgroundColor={Colors.transparent}
          barStyle="dark-content"
          translucent={true}
        />
        <NavigationContainer
          ref={(ref) => NavigationServices.setTopLevelNavigator(ref)}
          onNavigationStateChange={this._handleNavigationChange}>
          <AppRouter />
        </NavigationContainer>
        {this.props.loading && <LoadingView />}
      </>
    );
  }
}

const _getRoute = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return _getRoute(route);
  }
  return route;
};

export default connect(
  (state) => ({
    nav: state.nav,
    loading: state.loadingState.loading,
  }),
  {onChangeNavigation},
)(App);
