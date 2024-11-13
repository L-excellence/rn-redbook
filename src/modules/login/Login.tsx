import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  TextInput,
  LayoutAnimation,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';
import {formatPhone, replaceBlank} from '../../utils/StringUtil';
import UserStore from '../../store/UserStore';

export default () => {
  // 分为 快捷登录 和 密码输入 登录
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(true);
  const [phone, setPhone] = useState('');
  const [pwd, setPwd] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const canLogin = phone.length === 13 && pwd.length && check;

  const handleLogin = async () => {
    if (!canLogin) return;
    // Node 服务端内置的手机号用户： 18751609896 123456
    UserStore.requestLogin(replaceBlank(phone), pwd, success => {
      if (success) {
        navigation.replace('HomeTab');
      } else {
        ToastAndroid.show('登录失败，请检查用户名和密码', ToastAndroid.LONG);
      }
    });
  };

  const renderProtocol = () => {
    const styles = StyleSheet.create({
      protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 12,
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      labelTxt: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
      },
      protocolTxt: {
        fontSize: 12,
        color: '#1020ff',
      },
    });
    return (
      <View style={styles.protocolLayout}>
        <TouchableOpacity
          onPress={() => {
            setCheck(!check);
          }}>
          <Image
            style={styles.radioButton}
            source={check ? icon_selected : icon_unselected}
          />
        </TouchableOpacity>
        <Text style={styles.labelTxt}>我已阅读并同意</Text>
        <TouchableOpacity
          onPress={() => {
            // 通常会跳转到一个 H5 协议页面
            Linking.openURL('https://www.baidu.com');
          }}>
          <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      otherLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 100,
      },
      otherLoginTxt: {
        fontSize: 16,
        color: '#303080',
      },
      icon_arrow: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 6,
        transform: [{rotate: '180deg'}],
      },
      wxLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wxLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      oneKeyLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      oneKeyLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      logoMain: {
        width: 180,
        height: 65,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170,
      },
    });

    return (
      <View style={styles.root}>
        {renderProtocol()}

        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() => {
            // 增加视图切换过渡动画效果
            LayoutAnimation.easeInEaseOut();
            setLoginType('input');
          }}>
          <Text style={styles.otherLoginTxt}>其他登录方式</Text>
          <Image style={styles.icon_arrow} source={icon_arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.7}>
          <Image style={styles.icon_wx} source={icon_wx_small} />
          <Text style={styles.wxLoginTxt}>微信登录</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.oneKeyLoginButton} activeOpacity={0.7}>
          <Text style={styles.oneKeyLoginTxt}>一键登录</Text>
        </TouchableOpacity>

        <Image style={styles.logoMain} source={icon_logo_main} />
      </View>
    );
  };

  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 48,
      },
      pwdLogin: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 56,
      },
      tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28,
      },
      pre86: {
        fontSize: 24,
        color: '#bbb',
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 6,
      },
      phoneInput: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginLeft: 16,
      },
      pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8,
      },
      pwdInput: {
        marginLeft: 0,
        marginRight: 16,
      },
      iconEye: {
        width: 30,
        height: 30,
        color: '#bbb',
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
      },
      exchangeIcon: {
        width: 16,
        height: 16,
      },
      codeLoginTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
        marginLeft: 4,
      },
      forgetPwdTxt: {
        fontSize: 14,
        color: '#303080',
      },
      loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 16,
      },
      loginButtonDisabled: {
        width: '100%',
        height: 56,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 16,
      },
      loginTxt: {
        fontSize: 20,
        color: 'white',
      },
      wxqqLayoyt: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center',
      },
      icon_wx: {
        width: 50,
        height: 50,
        marginRight: 60,
      },
      icon_qq: {
        width: 50,
        height: 50,
        marginRight: 60,
      },
      closeButton: {
        position: 'absolute',
        left: 36,
        top: 24,
      },
      closeImg: {
        width: 28,
        height: 28,
      },
    });

    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image style={styles.triangle} source={icon_triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholderTextColor="#bbb"
            placeholder="请输入手机号码"
            value={phone}
            onChangeText={text => {
              setPhone(formatPhone(text));
            }}
            autoFocus={false}
            // 数字键盘
            keyboardType="number-pad"
            maxLength={13}
          />
        </View>
        <View style={styles.pwdLayout}>
          <TextInput
            style={[styles.phoneInput, styles.pwdInput]}
            placeholderTextColor="#bbb"
            placeholder="输入密码"
            autoFocus={false}
            // 密码是否隐藏展示处理
            secureTextEntry={!eyeOpen}
            value={pwd}
            onChangeText={text => setPwd(text)}
            // keyboardType="number-pad"
            // maxLength={6}
          />
          <TouchableOpacity
            onPress={() => {
              setEyeOpen(!eyeOpen);
            }}>
            <Image
              style={styles.iconEye}
              source={eyeOpen ? icon_eye_open : icon_eye_close}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.changeLayout}>
          <Image style={styles.exchangeIcon} source={icon_exchange} />
          <Text style={styles.codeLoginTxt}>验证码登录</Text>
          <Text style={styles.forgetPwdTxt}>忘记密码？</Text>
        </View>

        <TouchableOpacity
          style={canLogin ? styles.loginButton : styles.loginButtonDisabled}
          activeOpacity={canLogin ? 0.7 : 1}
          onPress={handleLogin}>
          <Text style={styles.loginTxt}>登录</Text>
        </TouchableOpacity>

        {renderProtocol()}

        <View style={styles.wxqqLayoyt}>
          <Image style={styles.icon_wx} source={icon_wx} />
          <Image style={styles.icon_qq} source={icon_qq} />
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            // 增加视图切换过渡动画效果
            LayoutAnimation.easeInEaseOut();
            setLoginType('quick');
          }}>
          <Image style={styles.closeImg} source={icon_close_modal} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
