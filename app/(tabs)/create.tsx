import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { IOAuthStrategy } from '@wix/sdk';
import { useWixAuth, useWixModules } from '@wix/sdk-react';
import { functions } from '@wix/http-functions';
import { useWixLogin } from 'wix-login-react-native';
import { CreatePage } from '../../components/CreatePage';
import { uploadVideo } from '../../utils/upload';

export default function Create() {
  const modules = useWixModules({ functions });
  const auth = useWixAuth<IOAuthStrategy>();
  const login = useWixLogin();
  const router = useRouter();

  if (!auth.loggedIn()) {
    login.openLoginModal();
    return <View />;
  }

  return (
    <CreatePage
      uploadReel={async (title: string, videoFile: string) => {
        const response = await modules.functions.post('prepareReelUpload', {
          body: JSON.stringify({ title }),
        });

        const json = await response.json();

        try {
          await uploadVideo(videoFile, json.uploadUrl);
          return 'success';
        } catch (err) {
          return 'error';
        }
      }}
      onUploadCompleted={() => router.push('/')}
    />
  );
}
