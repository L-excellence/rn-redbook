import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';
import {launchImageLibrary} from 'react-native-image-picker';

// import icon_tab_home_normal from '../../assets/icon_tab_home_normal.png';
// import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';
// import icon_tab_shop_normal from '../../assets/icon_tab_shop_normal.png';
// import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';
// import icon_tab_message_normal from '../../assets/icon_tab_message_normal.png';
// import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';
// import icon_tab_mine_normal from '../../assets/icon_tab_mine_normal.png';
// import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';
import icon_tab_publish from '../../assets/icon_tab_publish.png';

const BottomTab = createBottomTabNavigator();

export default () => {
  // 自定义底部操作栏
  const RedBookTabBar = ({state, descriptors, navigation}: any) => {
    // routes 是下方 BottomTab.Screen 注册的路由集合，index 是当前选中的 Tab 索引
    const {routes, index} = state;

    const onPublishPress = () => {
      launchImageLibrary(
        {
          // 相册图片
          mediaType: 'photo',
          // 质量是 1
          quality: 1,
          includeBase64: true,
        },
        res => {
          const {assets} = res;
          console.log('assets: ', assets);
          if (!assets?.length) {
            return;
          }
          const {uri, width, height, fileName, fileSize, type} = assets[0];
        },
      );
    };

    return (
      <View style={styles.tabBarContainer}>
        {routes.map((route: any, i: number) => {
          const {options} = descriptors[route.key];
          const {title: label} = options;
          const isFocused = index === i;

          // 自定义中间 发布 Tab 样式
          if (i === 2) {
            return (
              <TouchableOpacity
                key={label}
                style={styles.tabItem}
                onPress={onPublishPress}>
                <Image
                  style={styles.iconTabPublish}
                  source={icon_tab_publish}
                />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={label}
              style={styles.tabItem}
              onPress={() => {
                // navigate 是在路由栈中找到路由，直接定位过去
                navigation.navigate(route.name);
              }}>
              <Text
                style={{
                  fontSize: isFocused ? 18 : 16,
                  color: isFocused ? '#333' : '#999',
                  fontWeight: isFocused ? 'bold' : 'normal',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        // screenOptions={({route}) => {
        //   return {
        //     tabBarIcon: ({focused, color, size}) => {
        //       let img;
        //       if (route.name === 'Home') {
        //         img = focused ? icon_tab_home_selected : icon_tab_home_normal;
        //       } else if (route.name === 'Shop') {
        //         img = focused ? icon_tab_shop_selected : icon_tab_shop_normal;
        //       } else if (route.name === 'Message') {
        //         img = focused
        //           ? icon_tab_message_selected
        //           : icon_tab_message_normal;
        //       } else if (route.name === 'Mine') {
        //         img = focused ? icon_tab_mine_selected : icon_tab_mine_normal;
        //       }
        //       return (
        //         <Image
        //           style={{
        //             width: size,
        //             height: size,
        //             tintColor: color,
        //           }}
        //           source={img}
        //         />
        //       );
        //     },
        //   };
        // }}
        // // @ts-ignore
        // tabBarOptions={{
        //   activeTintColor: '#ff2442',
        //   inactiveTintColor: '#999',
        // }}
        // 自定义 Tab
        tabBar={props => <RedBookTabBar {...props} />}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{title: '首页'}}
        />
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{title: '购物'}}
        />
        {/* 放置一个占位 Tab，实现 Publish 自定义功能 */}
        <BottomTab.Screen
          name="Publish"
          component={() => null}
          options={{title: '发布'}}
        />
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{title: '消息'}}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{title: '我'}}
        />
      </BottomTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTabPublish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});
