// react
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// component
import QueryView from './QueryView';
import SettingView from './SettingView';

import {RootStackParamList} from './HomeScreenType';

const HomeScreen = () => {
  // 全域設定SAFE VIEW區域
  const insets = useSafeAreaInsets();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="QueryView">
          <Stack.Screen
            name="QueryView"
            component={QueryView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SettingView"
            component={SettingView}
            options={{
              headerTitle: '設定', // 自定義標題
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5DC', // 米白色
  },
});

export default HomeScreen;
