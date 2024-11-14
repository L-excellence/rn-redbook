import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import icon_arrow from '../../../assets/icon_arrow.png';
import icon_delete from '../../../assets/icon_delete.png';
import {save} from '../../../utils/Storage';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export interface CategoryModalRef {
  show: () => void;
  hide: () => void;
}

type Props = {
  categoryList: Category[];
};

export default forwardRef(function CategoryModal(props: Props, ref) {
  const {categoryList} = props;
  const [visible, setVisible] = useState(false);
  const [myList, setMyList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!categoryList) return;
    const list1 = categoryList.filter(i => i.isAdd);
    const list2 = categoryList.filter(i => !i.isAdd);
    setMyList(list1);
    setOtherList(list2);
  }, [categoryList]);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const handleEdit = () => {
    const oldValue = edit;
    const newValue = !oldValue;
    setEdit(newValue);

    // 点击完成编辑，保存数据
    if (oldValue) {
      save('categoryList', JSON.stringify([...myList, ...otherList]));
    }
  };

  const onMyItemPress = useCallback(
    (item: Category) => {
      if (!edit) return;
      const newMyList = myList.filter(i => i.name !== item.name);
      const newOtherList = [...otherList, {...item, isAdd: false}];
      // 增加视图 layout 布局动画
      LayoutAnimation.easeInEaseOut();
      setMyList(newMyList);
      setOtherList(newOtherList);
    },
    [edit, myList, otherList],
  );

  const onOtherItemPress = useCallback(
    (item: Category) => {
      if (!edit) return;
      const newOtherList = otherList.filter(i => i.name !== item.name);
      const newMyList = [...myList, {...item, isAdd: true}];
      // 增加视图 layout 布局动画
      LayoutAnimation.easeInEaseOut();
      setMyList(newMyList);
      setOtherList(newOtherList);
    },
    [edit, myList, otherList],
  );

  const renderMyList = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.titleTxt}>我的频道</Text>
          <Text style={styles.subTitleTxt}>点击进入频道</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editTxt} onPress={handleEdit}>
              {edit ? '完成编辑' : '进入编辑'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={hide}>
            <Image style={styles.closeImg} source={icon_arrow} />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {myList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={
                  item.default ? styles.itemLayoutDefault : styles.itemLayout
                }
                onPress={() => onMyItemPress(item)}>
                <Text style={styles.itemTxt}>{item.name}</Text>
                {edit && !item.default && (
                  <Image style={styles.deleteImg} source={icon_delete} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  const renderOtherList = () => {
    return (
      <>
        <View style={[styles.row, {marginTop: 32}]}>
          <Text style={styles.titleTxt}>推荐频道</Text>
          <Text style={styles.subTitleTxt}>点击添加频道</Text>
        </View>

        <View style={styles.listContainer}>
          {otherList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.itemLayout}
                onPress={() => onOtherItemPress(item)}>
                <Text style={styles.itemTxt}>+ {item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade"
      onRequestClose={hide}>
      <View style={styles.root}>
        <View style={styles.content}>
          {renderMyList()}
          {renderOtherList()}
        </View>
        <View style={styles.mask} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    // Modal 的内容区，不遮挡 顶部 Tab 和 顶部状态栏
    marginTop: 48 + (StatusBar.currentHeight || 0),
    paddingBottom: 40,
  },
  mask: {
    width: '100%',
    flex: 1,
    backgroundColor: '#00000060',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  subTitleTxt: {
    fontSize: 13,
    color: '#999',
    marginLeft: 12,
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 10,
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTxt: {
    fontSize: 13,
    color: '#3050ff',
  },
  closeButton: {
    padding: 12,
  },
  closeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemLayout: {
    // 确保一行排列 4 个，并适配在不同设备下。
    width: (SCREEN_WIDTH - 80) / 4,
    marginLeft: 16,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginTop: 12,
  },
  itemLayoutDefault: {
    // 确保一行排列 4 个，并适配在不同设备下。
    width: (SCREEN_WIDTH - 80) / 4,
    marginLeft: 16,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 6,
    marginTop: 12,
  },
  itemTxt: {
    fontSize: 16,
    color: '#666',
  },
  deleteImg: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: -6,
    right: -6,
  },
});
