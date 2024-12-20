import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import icon_logo_main from '../../assets/icon_main_logo.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../utils/Storage';
import UserStore from '../../store/UserStore';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 2000);
  }, []);

  const getUserInfo = async () => {
    const cacheUserInfo = await load('userInfo');
    if (cacheUserInfo) {
      UserStore.setUserInfo(JSON.parse(cacheUserInfo));
      startHome();
    } else {
      startLogin();
    }
  };

  const startLogin = () => {
    navigation.replace('Login');
  };

  const startHome = () => {
    navigation.replace('MainTab');
  };

  return (
    <View style={styles.root}>
      <Image style={styles.logo_main} source={icon_logo_main} />
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
  logo_main: {
    width: 200,
    height: 110,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
