import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { WixProvider } from '@wix/sdk-react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function _RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <WixProvider>
        <_RootLayout />
      </WixProvider>
    </ThemeProvider>
  );
}
