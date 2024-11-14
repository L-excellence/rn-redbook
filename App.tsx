/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Welcome from './src/modules/welcome/Welcome';
import Login from './src/modules/login/Login';
import MainTab from './src/modules/main/MainTab';
import ArticleDetail from './src/modules/articleDetail/ArticleDetail';
import SearchGoods from './src/modules/searchGoods/SearchGoods';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />

      {/* 路由容器 */}
      <NavigationContainer>
        {/* 路由管理器 */}
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            // 将导航栈页面层级向上提一层，避免出现页面穿透视图错乱
            cardStyle: {elevation: 1},
          }}>
          {/* 一个个页面 */}
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              // 不显示内置的页面标题栏（我们自己实现）
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              // 不显示内置的页面标题栏（我们自己实现）
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              // 不显示内置的页面标题栏（我们自己实现）
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="ArticleDetail"
            component={ArticleDetail}
            options={{
              // 不显示内置的页面标题栏（我们自己实现）
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="SearchGoods"
            component={SearchGoods}
            options={{
              headerShown: false,
              // 将页面配置成透明页面，实现无缝切换至搜索页面效果
              presentation: 'transparentModal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
