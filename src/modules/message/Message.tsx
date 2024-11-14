import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default () => {
  return (
    <View style={styles.root}>
      <Text>消息页</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
