/**
 * @author lam
 * @date 2018/8/19 11:31
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    StatusBar
} from 'react-native';
import NavBar from "../common/NavBar";

export default class SharePage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],  // 电影列表的数据源
            loaded: false,  // 用来控制loading视图的显示，当数据加载完成，loading视图不再显示
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.returnTag(2);
        goBack();
        // this.props.navigation.state.params.returnTag(2);
        // this.props.navigation.goBack();
        return true;
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={false}
                    animated={true}
                    backgroundColor={"#1E82D2"}
                    barStyle={"light-content"}
                />
                <NavBar
                    title="分享"
                    leftIcon="ios-arrow-back"
                    leftPress={
                        // const {navigate, goBack, state} = this.props.navigation;
                        // state.params.returnTag(2);
                        // goBack();
                        this.leftPress
                    }
                    // titleStyle={styles.titleStyle}
                    // style={styles.style}
                />
                <View style={styles.container2}>
                    <Text>分享界面</Text>
                </View>
            </View>
        );
    }

    leftPress = () => {
        this.props.navigation.state.params.returnTag(2);
        this.props.navigation.goBack();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

});