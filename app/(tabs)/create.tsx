import { IOAuthStrategy } from '@wix/sdk';
import { useWixAuth, useWixModules } from '@wix/sdk-react';
import { functions } from '@wix/http-functions';
import { useWixLogin } from 'wix-login-react-native';
import { View } from 'react-native';
import { FileSystemUploadType, uploadAsync } from 'expo-file-system';
import { CreatePage } from '../../components/CreatePage';
import { useRouter } from 'expo-router';

export default function Create() {
  const modules = useWixModules({ functions });
  const auth = useWixAuth<IOAuthStrategy>();
  const login = useWixLogin();
  const router = useRouter();

  if (!auth.loggedIn()) {
    login.openLoginModal();
    return <View />;
  }

  async function uploadReel(title: string, videoFile: string) {
    const response = await modules.functions.post('prepareReelUpload', {
      body: JSON.stringify({ title }),
    });

    const json = await response.json();

    await uploadAsync(json.uploadUrl, videoFile, {
      fieldName: 'file',
      uploadType: FileSystemUploadType.MULTIPART,
    });

    return 'success' as const;
  }

  return (
    <CreatePage
      uploadReel={uploadReel}
      onUploadCompleted={() => router.push('/')}
    />
  );
}
