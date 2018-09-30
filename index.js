/** @format */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from "./app/PicPickerDemo/App";
import MovieListScreen from "./app/FetchDemo/SampleAppMovies";

AppRegistry.registerComponent(appName, () => MovieListScreen);
