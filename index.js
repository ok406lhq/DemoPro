/** @format */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import VideoPlayer from "./app/VideoDemo/VideoPlayer";
import {app} from "./app/LoginDemo/app";

AppRegistry.registerComponent(appName, () => app);
