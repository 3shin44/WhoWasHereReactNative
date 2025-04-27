// react
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

// js
const moment = require('moment');
import * as ParamType from './DatetimePickerType';

const DatetimePicker = ({
  onEmitQueryEvent,
}: {
  onEmitQueryEvent: (queryParam: ParamType.QueryParam) => void;
}) => {
  const [state, setState] = useState<ParamType.StateType>({
    queryDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    queryDateOpen: false,
    startTimeOpen: false,
    endTimeOpen: false,
  });

  const initDefaultTime = () => {
    // 預選當下時間
    let getCurrent = moment();
    let defaultDate = new Date(getCurrent);
    let defaultStartTime = new Date(getCurrent.hour(8).minutes(0).seconds(0));
    let defaultEndTime = new Date(getCurrent.hour(18).minutes(0).seconds(0));

    setState(prev => ({
      ...prev,
      queryDate: defaultDate,
      startTime: defaultStartTime,
      endTime: defaultEndTime,
    }));
  };

  // emit事件
  const onPressQueryEvent = () => {
    onEmitQueryEvent({
      queryDate: moment(state.queryDate).format('YYYY-MM-DD'),
      startTime: moment(state.startTime).format('HH:mm:ss'),
      endTime: moment(state.endTime).format('HH:mm:ss'),
    });
  };

  // 初始化
  useEffect(() => {
    initDefaultTime();
  }, []);

  return (
    <View>
      <Button
        style={styles.queryBtn}
        mode="contained-tonal"
        onPress={() => setState(prev => ({...prev, queryDateOpen: true}))}>
        查詢日期：{moment(state.queryDate).format('YYYY-MM-DD')}
      </Button>
      <DatePicker
        modal
        open={state.queryDateOpen}
        date={state.queryDate}
        mode="date"
        onConfirm={date => {
          setState(prev => ({...prev, queryDate: date, queryDateOpen: false}));
        }}
        onCancel={() => {
          setState(prev => ({...prev, queryDateOpen: false}));
        }}
      />

      {/* A JSX comment */}
      <View>
        <View>
          <Button
            style={styles.queryBtn}
            mode="contained-tonal"
            onPress={() => setState(prev => ({...prev, startTimeOpen: true}))}>
            起始時間：{moment(state.startTime).format('HH:mm:ss')}
          </Button>
          <DatePicker
            modal
            open={state.startTimeOpen}
            date={state.startTime}
            mode="time"
            onConfirm={date => {
              setState(prev => ({
                ...prev,
                startTime: date,
                startTimeOpen: false,
              }));
            }}
            onCancel={() => {
              setState(prev => ({...prev, startTimeOpen: false}));
            }}
          />
        </View>

        <View>
          <Button
            style={styles.queryBtn}
            mode="contained-tonal"
            onPress={() => setState(prev => ({...prev, endTimeOpen: true}))}>
            結束時間：{moment(state.endTime).format('HH:mm:ss')}
          </Button>
          <DatePicker
            modal
            open={state.endTimeOpen}
            date={state.endTime}
            mode="time"
            onConfirm={date => {
              setState(prev => ({...prev, endTime: date, endTimeOpen: false}));
            }}
            onCancel={() => {
              setState(prev => ({...prev, endTimeOpen: false}));
            }}
          />
        </View>
      </View>

      <View style={styles.execContainer}>
        <View style={styles.btnPadding}>
          <Button mode="outlined" onPress={initDefaultTime}>
            重設時間
          </Button>
        </View>
        <View style={styles.btnPadding}>
          <Button mode="contained" onPress={onPressQueryEvent}>
            查詢
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  execContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  queryBtn: {
    marginVertical: 2,
  },
  btnPadding: {
    flex: 1,
  },
});

export default DatetimePicker;
