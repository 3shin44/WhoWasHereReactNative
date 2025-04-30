// react
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

// component
import DatetimePicker from '../component/DatetimePicker';
import ImgCard from '../component/ImgCard';

// js
import {queryVisitor} from '../api/apiClient';
import {QueryParam} from '../component/DatetimePickerType';
import * as QueryViewType from './QueryViewType';

const QueryView = () => {
  const {colors} = useTheme(); // 取得主題色系

  const [state, setState] = useState<QueryViewType.StateType>({
    isLoading: false,
    btnLock: false,
    vistorList: [],
  });

  const queryEventHandler = async (data: QueryParam) => {
    try {
      setState(prev => ({...prev, isLoading: true, vistorList: []}));
      let res = await queryVisitor(data);
      setState(prev => ({
        ...prev,
        isLoading: true,
        vistorList: res.resultList || [],
      }));
    } catch (e) {
      console.log('API: queryVisitor error. ', e);
    } finally {
      setState(prev => ({...prev, isLoading: false}));
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <DatetimePicker onEmitQueryEvent={queryEventHandler} />
      </View>

      {state.isLoading && (
        <View style={[styles.content, {justifyContent: 'center'}]}>
          <ActivityIndicator
            animating={state.isLoading}
            color={colors.primary}
            size="large"
          />
        </View>
      )}

      {!state.isLoading && (
        <View style={styles.content}>
          <ImgCard propsVistorList={state.vistorList} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // 讓主要內容區域佔滿剩餘空間
    padding: 16,
  },
});

export default QueryView;
