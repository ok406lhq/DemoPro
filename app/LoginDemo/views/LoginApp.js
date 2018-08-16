/**
 * @author lam
 * @date 2018/8/8 10:31
 */
import React, {Component} from 'react';
import {
    View,
    Keyboard,
    Platform,
    Image,
    StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {isIphoneX, zAppBarHeight, zdp, zsp, zStatusBarHeight, zWidth} from "../utils/ScreenUtil";
import MyTextInputWithIcon from "../common/MyTextInputWithIcon";
import MyButtonView from "../common/MyButtonView";
import ZText from "../common/ZText";
import {cusColors} from "../utils/cusColors";
import ToastUtil from "../utils/ToastUtil";
import {fetchRequest} from "../utils/FetchUtil";
import {SPReadLoginInfo, SPSaveLoginInfo} from "../storage/Storage";
import {checkMobile} from "../utils/CheckUitls";
import CountdownUtil from "../utils/CountdownUtil";

const {width, height} = Dimensions.get('window');

export default class LoginApp extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        //todo DEV
        this.state = {
            phone: '',
            password: ''
        };
    }

    componentDidMount() {
        // this.pressLogin();
        // alert(zStatusBarHeight);
        SPReadLoginInfo()
            .then(res => {
                console.log(res);
                this.setState({
                    phone: res.phone,
                    // password: res.password
                })

                //todo DEV
                /*  if (InitConfig.isLoginDirect) {
                      setTimeout(()=>{
                      this.pressLogin()
                      },1000)
                  }*/
            }).catch(err => {

        })
    }


    render() {
        return (
            <KeyboardAwareScrollView style={{flex: 1, width: zWidth, backgroundColor: 'white'}}
                                     behavior="padding"
                                     resetScrollToCoords={{x: 0, y: 0}}
                                     contentContainerStyle={{
                                         justifyContent: 'flex-start',
                                         alignItems: 'center'
                                     }}
                                     scrollEnabled={false}
                                     showsVerticalScrollIndicator={false}
                                     keyboardShouldPersistTaps={'always'}>
                <View style={{
                    flex: 1,
                    marginTop: Platform.OS === 'ios' ? -zStatusBarHeight : 0,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Image source={{uri: isIphoneX() ? 'login_bg_x' : 'login_bg'}}
                           resizeMode={'cover'}
                           style={{
                               width,
                               height: height,
                               position: 'absolute'
                           }}/>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                    <View
                        style={{flex: 1, alignItems: 'center'}}>

                        <StatusBar
                            hidden={false}
                            translucent={true}
                            barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                            backgroundColor={'#fff6fd00'}
                            networkActivityIndicatorVisible={false}
                        />

                        <Image source={require('../assets/image/appname.png')}
                               style={{
                                   width: zdp(140),
                                   height: zdp(66),
                                   marginTop: zAppBarHeight + zdp(20)
                               }}
                               resizeMode={'contain'}/>

                    </View>
                </View>
                <MyTextInputWithIcon
                    style={{marginTop: zdp(160)}}
                    maxLength={11}
                    placeholder={'请输入手机号'}
                    keyboardType={'numeric'}
                    iconName={'login_phone'}
                    defaultValue={this.state.phone}
                    onChangeText={text => {
                        this.setState({
                            phone: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    secureTextEntry={true}
                    placeholder={'密码登录'}
                    defaultValue={this.state.password}
                    // keyboardType={'email-address'}
                    iconName={'login_psw'}
                    onChangeText={text => {
                        this.setState({
                            password: text
                        })
                    }}
                />

                <MyButtonView style={{width: width / 1.3, marginTop: zdp(40)}} modal={1}
                              title={'登 录'}
                              onPress={this.pressLogin}/>
                <View style={{
                    width,
                    marginTop: zdp(10),
                    height: zdp(40),
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center', alignItems: 'center',
                                          padding: zdp(5)
                                      }}
                                      onPress={
                                          this.pressLoginByVerify
                                      }>

                        <ZText parentStyle={{marginLeft: zdp(40)}} content={'验证码登录'}
                               fontSize={zsp(16)} color={cusColors.text_secondary}
                               textAlign={'center'}/>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center', alignItems: 'center',
                                          padding: zdp(5)
                                      }}
                                      onPress={
                                          this.pressForgetPsw
                                      }>

                        <ZText parentStyle={{marginRight: zdp(40)}} content={'忘记密码?'}
                               fontSize={zsp(16)} color={cusColors.text_secondary}
                               textAlign={'center'}/>
                    </TouchableOpacity>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: zdp(5),
                    marginTop: zdp(40)
                }}>
                    <ZText content={'没有账号?'} fontSize={zsp(16)}
                           color={cusColors.text_secondary}/>
                    <MyButtonView style={{width: zdp(80), height: zdp(30), marginTop: 0}}
                                  modal={1}
                                  title={'注册账号'}
                                  fontSize={zsp(16)}
                                  onPress={this.pressRegister.bind(this)}/>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    pressLogin = () => {
        Keyboard.dismiss();

        if (!checkMobile(this.state.phone)) {
            return;
        }


        let formData = new FormData();
        formData.append('phone', this.state.phone);
        formData.append('password', this.state.password);
        fetchRequest('Login', 'POST', formData)
            .then(res => {
                    console.log(res);
                    console.log(res.data);

                    if (res.respCode === 200) {
                        // let allCard = getAllCard(res.data.merCode);
                        // console.log(...allCard);
                        // let cardLength = getCardLength(res.data.merCode);
                        // console.log(cardLength);
                        console.log(res.data.CardLen);

                        SPSaveLoginInfo(this.state.phone, this.state.password);

                        this.props.navigation.navigate('Video');

                    } else {
                        ToastUtil.showShort(res.respMsg);
                    }
                }
            ).catch(err => {
            console.log(err);
            ToastUtil.showShort(err)
        });
    };

    pressLoginByVerify = () => {
        this.props.navigation.navigate('LoginByVerify');
    };

    pressForgetPsw = () => {
        this.props.navigation.navigate('ForgetPsw');
    };

    pressRegister = () => {
        this.props.navigation.navigate('RegisterMerchant');
    }
}
