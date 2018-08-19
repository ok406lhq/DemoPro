/**
 * @author lam
 * @date 2018/8/19 11:28
 */

import React from 'react';
import {StackNavigator} from "react-navigation";
import VideoPage from "./page/VideoPage";
import SharePage from "./page/SharePage";


export const app = StackNavigator({
        Video: {screen: VideoPage},
        Share: {screen: SharePage},
    },

    {
        initialRouteName: 'Video',
        headerMode: 'screen'
    }
);
