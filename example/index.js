import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import { configure } from 'parsely-react-native-sdk';

configure('test.com');

AppRegistry.registerComponent(appName, () => App);
