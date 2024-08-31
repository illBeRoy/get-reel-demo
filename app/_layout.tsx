import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import {
  IOAuthStrategy,
  OAuthStrategy,
  useWix,
  useWixAuth,
  WixProvider,
} from '@wix/sdk-react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { WixLogin } from 'wix-login-react-native';

function _RootLayout() {
  const client = useWix();
  const auth = useWixAuth<IOAuthStrategy>();

  return (
    <>
      <StatusBar style="light" />
      <WixLogin
        client={client}
        onLoginComplete={(tokens) => auth.setTokens(tokens)}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <WixProvider
        auth={OAuthStrategy({
          clientId: 'd8373991-cadc-4306-8832-46198d15d007',
        })}
      >
        <_RootLayout />
      </WixProvider>
    </ThemeProvider>
  );
}
