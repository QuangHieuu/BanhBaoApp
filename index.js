/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/src/App';
import {name as appName} from './app.json';
import AppProvider from './app/src/AppProvider';

AppRegistry.registerComponent(appName, () => AppProvider);
