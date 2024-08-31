import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

export interface ReelUploaderProps {
  videoFile: string;
  uploadReel: (
    title: string,
    videoFile: string,
  ) => Promise<'success' | 'error'>;
  onUploadCompleted: () => void;
  onUploadCanceled: () => void;
}

export default function ReelUploader({
  onUploadCompleted,
  uploadReel,
  videoFile,
  onUploadCanceled,
}: ReelUploaderProps) {
  const [title, setTitle] = useState('');
  const [uploadState, setUploadState] = useState<
    'ready' | 'preparing' | 'uploading' | 'success' | 'error'
  >('ready');

  const player = useVideoPlayer(videoFile, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    if (uploadState === 'success') {
      setTimeout(() => {
        onUploadCompleted();
      }, 10000);
    }
  }, [uploadState, onUploadCompleted]);

  const handleUpload = async () => {
    setUploadState('preparing');
    const result = await uploadReel(title, videoFile);
    setUploadState(result);
  };

  if (uploadState === 'success') {
    return (
      <View style={styles.loaderContainer}>
        <Image source={require('../assets/animations/success.gif')} />
      </View>
    );
  }

  if (uploadState === 'preparing' || uploadState === 'uploading') {
    return (
      <View style={styles.loaderContainer}>
        <Image source={require('../assets/animations/upload.gif')} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <ScrollView
          contentContainerStyle={{ gap: 20 }}
          keyboardDismissMode="on-drag"
          overScrollMode="never"
        >
          <VideoView
            player={player}
            contentFit="cover"
            nativeControls={false}
            style={styles.videoPreview}
          />
          <TextInput
            style={styles.titleInput}
            placeholder="Describe your video"
            placeholderTextColor="white"
            value={title}
            onChangeText={setTitle}
            numberOfLines={2}
          />
          <Button title="Upload Now" onPress={handleUpload} />
          <Button title="Back" onPress={onUploadCanceled} color="white" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  videoPreview: {
    width: 300,
    height: 534,
  },
  titleInput: {
    color: 'white',
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  loaderContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    color: 'white',
  },
});
