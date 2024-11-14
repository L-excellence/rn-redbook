import {observer, useLocalStore} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import HomeStore from './HomeStore';
import FlowList from '../../components/flowlist/FlowList';

import icon_heart from '../../assets/icon_heart.png';
import icon_heart_empty from '../../assets/icon_heart_empty.png';
import icon_arrow from '../../assets/icon_arrow.png';
import ResizeImage from '../../components/ResizeImage';
import Heart from '../../components/Heart';
import TitleBar from './components/TitleBar';
import CategoryList from './components/CategoryList';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default observer(() => {
  const store = useLocalStore(() => new HomeStore());

  const categoryList = store.categoryList.filter(i => i.isAdd);

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
  }, []);

  const refreshNewData = () => {
    console.log('下拉刷新');
    store.resetPage();
    store.requestHomeList();
  };

  const loadMoreData = () => {
    console.log('上拉加载下一页数据');
    store.requestHomeList();
  };

  const Footer = () => {
    return <Text style={styles.footerTxt}>没有更多数据</Text>;
  };

  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <View style={styles.item}>
        <ResizeImage uri={item.image} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          {/* <Image style={styles.heart} source={icon_heart_empty} /> */}
          <Heart
            value={item.isFavorite}
            onValueChanged={value => {
              console.log(value);
            }}
          />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <TitleBar
        tab={1}
        onTabChanged={tab => {
          console.log('tab: ', tab);
        }}
      />

      <FlowList
        style={styles.flatList}
        contentContainerStyle={styles.container}
        keyExtrator={(item: ArticleSimple) => `${item.id}`}
        extraData={[store.refreshing]}
        data={store.homeList}
        renderItem={renderItem}
        numColumns={2}
        refreshing={store.refreshing}
        onRefresh={refreshNewData}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreData}
        ListFooterComponent={Footer}
        ListHeaderComponent={
          <CategoryList
            categoryList={categoryList}
            allCategoryList={store.categoryList}
            onCategoryChange={category => {
              console.log('category: ', category);
            }}
          />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  container: {
    // paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  footerTxt: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
