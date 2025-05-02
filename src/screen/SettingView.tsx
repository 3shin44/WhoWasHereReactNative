// react
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput, Snackbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

// JS
import {CONFIG} from '../config/config';
import {getVersion} from '../api/apiClient';
import axiosInstance from '../api/axiosConfig';
import {storePreference, loadPreference} from '../util/util';

const SettingView = () => {
  const [state, setState] = React.useState({
    key: 'API_BASE_URL',
    value: '',
    tempValue: '',
  });
  const [apiMsg, setApiMsg] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  // 初始化載入
  const initProcess = React.useCallback(async () => {
    let getExistedData = await loadPreference(state.key);
    getExistedData = getExistedData || CONFIG.API_BASE_URL;
    setState(prev => ({
      ...prev,
      value: getExistedData,
      tempValue: getExistedData,
    }));
  }, [state.key]);

  // CREATE 載入
  React.useEffect(() => {
    initProcess();
  }, [initProcess]);

  // 更新
  const updateConfig = () => {
    setState(prev => ({
      ...prev,
      value: state.tempValue,
    }));

    CONFIG.API_BASE_URL = state.tempValue;
    axiosInstance.defaults.baseURL = state.tempValue;
    storePreference(state.key, state.tempValue);
  };

  const onDismissSnackBar = () => setVisible(false);

  // 測試API
  const testAPI = async () => {
    let resMsg = '';
    try {
      resMsg = await getVersion();
      setVisible(false);
    } catch (e) {
      console.log('API: getVersion error. ', e);
      resMsg = `API: getVersion error. ${e}`;
    } finally {
      setVisible(true);
      setApiMsg(resMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          label="API SERVER"
          value={state.tempValue}
          onChangeText={text =>
            setState(prev => ({
              ...prev,
              tempValue: text,
            }))
          }
        />

        <View style={styles.execContainer}>
          <View style={styles.btnPadding}>
            <Button mode="outlined" onPress={testAPI}>
              測試
            </Button>
          </View>
          <View style={styles.btnPadding}>
            <Button mode="contained" onPress={updateConfig}>
              儲存
            </Button>
          </View>
        </View>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'DONE',
          onPress: () => {
            onDismissSnackBar;
          },
        }}>
        {apiMsg}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  execContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  btnPadding: {
    flex: 1,
  },
});

export default SettingView;
