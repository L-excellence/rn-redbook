import React, {useEffect, useState, useRef} from 'react';
import {Image, TouchableOpacity, StyleSheet, Animated} from 'react-native';

import icon_heart from '../assets/icon_heart.png';
import icon_heart_empty from '../assets/icon_heart_empty.png';

type Props = {
  value: boolean;
  onValueChanged?: (value: boolean) => void;
  size?: number;
};

export default (props: Props) => {
  const {value, onValueChanged, size = 20} = props;

  const [showState, setShowState] = useState<boolean>(false);

  const scale = useRef<Animated.Value>(new Animated.Value(0)).current;

  const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    setShowState(value);
  }, [value]);

  const onHeartPress = () => {
    const newState = !showState;
    setShowState(newState);
    onValueChanged?.(newState);

    if (newState) {
      // 默认显示
      alpha.setValue(1);
      const scaleAnim = Animated.timing(scale, {
        toValue: 1.8,
        duration: 300,
        useNativeDriver: false,
      });

      // 动画执行完成后隐藏
      const alphaAnim = Animated.timing(alpha, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
        delay: 200,
      });

      // 两个动画同步执行
      Animated.parallel([scaleAnim, alphaAnim]).start();
    } else {
      scale.setValue(0);
      alpha.setValue(0);
    }
  };

  return (
    <TouchableOpacity onPress={onHeartPress}>
      <Image
        style={[styles.container, {width: size, height: size}]}
        source={showState ? icon_heart : icon_heart_empty}
      />
      {/* 在点喜欢时，显示外围的光圈 由小到大 进行缩放，展示动画效果 */}
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 20,
          position: 'absolute',
          borderColor: '#ff2442',
          transform: [{scale: scale}],
          opacity: alpha,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
