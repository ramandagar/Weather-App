import { Platform, Alert, ToastAndroid } from 'react-native';

export const MyToast = function (msg) {
  try {
    if (msg !== '' && msg !== null && msg !== undefined) {
      Platform.select({
        ios: () => {
          Alert.alert('' + msg);
        },
        android: () => {
          ToastAndroid.show('' + msg, ToastAndroid.SHORT);
        },
      })();
    }
  } catch (error) {
    console.log(error);
  }
}; 