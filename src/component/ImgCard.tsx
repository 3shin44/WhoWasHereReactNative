import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';

// js
import * as ApiParamType from '../api/ApiParamType';
import * as ImgCardType from './ImgCardType';

const ImgCard = ({
  propsVistorList,
}: ImgCardType.ImgCardProps<ApiParamType.Visitor>) => {
  const [sourceList, setSourceList] = useState<ApiParamType.Visitor[]>([]);
  const [viewList, setViewList] = useState<ApiParamType.Visitor[]>([]);
  const [count, setCount] = useState(0);

  // 當 propsVistorList 變動時，同步更新列表
  useEffect(() => {
    setSourceList(propsVistorList);
    setViewList(propsVistorList.slice(0, 10)); // 一開始顯示前10筆
  }, [propsVistorList]);

  // 加載更多資料
  const loadMore = useCallback(() => {
    setCount(propsVistorList.length);

    const currentLength = viewList.length;
    const moreItems = sourceList.slice(currentLength, currentLength + 10); // 每次加10筆

    if (moreItems.length > 0) {
      setViewList(prev => [...prev, ...moreItems]);
    }
  }, [propsVistorList.length, viewList, sourceList]);

  // 每一個 item 渲染（用 useCallback 包起來，效能更好）
  const renderItem = useCallback(
    ({item, index}: {item: ApiParamType.Visitor; index: number}) => (
      <Card style={styles.card} mode="contained">
        <Text style={styles.cardText}>
          {index + 1}：{item.capture_datetime}
        </Text>

        <Card.Cover source={{uri: item.img_path}} />
      </Card>
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: ApiParamType.Visitor) => item.dbid.toString(),
    [],
  );

  return (
    <View>
      <Text style={styles.cardText}>總數量：{count}</Text>

      <FlatList
        data={viewList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 32,
  },
  card: {
    marginTop: 8,
  },
  cardText: {
    padding: 5,
  },
});

export default ImgCard;
