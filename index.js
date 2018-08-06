/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SampleAppMovies from "./app/FetchDemo/SampleAppMovies";

AppRegistry.registerComponent(appName, () => SampleAppMovies);
