/**
 * @author lam
 * @date 2018/8/8 14:03
 */
import LoginApp from "./views/LoginApp";
import VideoPlayer from "../VideoDemo/VideoPlayer";
import {StackNavigator} from "react-navigation";
import RegisterSuccess from "./views/RegisterSuccess";
import RegisterMerchant from "./views/RegisterMerchant";
import RegisterMerchantNext from "./views/RegisterMerchantNext";
import LoginByVerify from "./views/LoginByVerify";
import ForgetPsw from "./views/ForgetPsw";

export const app = StackNavigator({
        Login: {screen: LoginApp},
        Video: {screen: VideoPlayer},
        RegisterSuccess: {screen: RegisterSuccess},
        RegisterMerchant: {screen: RegisterMerchant},
        RegisterMerchantNext: {screen: RegisterMerchantNext},
        LoginByVerify: {screen: LoginByVerify},
        ForgetPsw: {screen: ForgetPsw},
    },

    {
        initialRouteName: 'Login',
        headerMode: 'screen'
    }
);