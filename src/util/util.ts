import AsyncStorage from '@react-native-async-storage/async-storage';

// 本機資料 儲存
export const storePreference = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Stored: ${key} = ${value}`);
  } catch (e) {
    console.error('儲存錯誤', e);
  }
};

// 本機資料 讀取
export const loadPreference = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Loaded: ${key} = ${value}`);
      return value;
    }
    return null;
  } catch (e) {
    console.error('讀取錯誤', e);
    return null;
  }
};
