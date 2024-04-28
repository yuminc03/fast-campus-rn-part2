import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { useTranslation } from './src/use-translation';
import Button from './src/Button';
import { useCookie } from './src/use-cookie';
import { useEffect } from 'react';

/**
 * 스플래시 스크린의 아이콘 출처: https://kor.pngtree.com/freepng/fresh-made-crispy-fortune-cookie_6323404.html
 * 스플래시 스크린 만들기 가이드: https://docs.expo.dev/guides/splash-screens/
 * 스플래시 스크린 피그마 템플릿: https://www.figma.com/community/file/1155362909441341285
 */

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale } = useTranslation();
  const { cookieKey } = useCookie();
  
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000)
  }, []);

  if (locale === null) return null;
  
  return (
    <View style={styles.container}>
      <Text>{t(cookieKey)}</Text>
      
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => setLocale("ko")}
          isSelected={locale === 'ko'}
          text="KO"
        />
        <Button
          onPress={() => setLocale("en")}
          isSelected={locale === 'en'}
          text="EN"
        />
        <Button
          onPress={() => setLocale("ja")}
          isSelected={locale === 'ja'}
          text="JA"
        />
        <Button
          onPress={() => setLocale("zh")}
          isSelected={locale === 'zh'}
          text="ZH"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row'
  }
});
