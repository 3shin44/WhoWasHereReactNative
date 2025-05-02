// react
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme, FAB} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// component
import DatetimePicker from '../component/DatetimePicker';
import ImgCard from '../component/ImgCard';
import {RootStackParamList} from './HomeScreenType'; // Stack 定義

// js
import {queryVisitor} from '../api/apiClient';
import {QueryParam} from '../component/DatetimePickerType';
import * as QueryViewType from './QueryViewType';

const QueryView = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SettingView'>) => {
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

  // 跳轉設定頁
  const navToSetting = () => {
    navigation.navigate('SettingView');
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

      {/* 懸浮按鈕 */}
      <FAB
        icon="cog-outline"
        size="small"
        style={styles.fab}
        onPress={navToSetting}
      />
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
  fab: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    margin: 5,
    color: 'black',
  },
});

export default QueryView;
