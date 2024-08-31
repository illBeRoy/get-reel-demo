import { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  CameraView,
  PermissionStatus,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera';
import { useRecording } from '../hooks/useRecording';

export interface VideoRecorderProps {
  onVideoRecorded: (videoFile: string) => void;
}

export function VideoRecorder({ onVideoRecorded }: VideoRecorderProps) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermissions, requestMicPermissions] = useMicrophonePermissions();
  const recording = useRecording({ maxDuration: 5 });

  useEffect(() => {
    if (cameraPermission?.status === PermissionStatus.UNDETERMINED) {
      requestCameraPermission();
    }
  }, [cameraPermission?.status]);

  useEffect(() => {
    if (micPermissions?.status === PermissionStatus.UNDETERMINED) {
      requestMicPermissions();
    }
  }, [micPermissions?.status]);

  useEffect(() => {
    if (recording.recordingFile) {
      onVideoRecorded(recording.recordingFile);
    }
  }, [recording.recordingFile, onVideoRecorded]);

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={recording.ref}
        facing="front"
        mode="video"
        mute
      />
      {recording.recordingState !== 'recording' && (
        <TouchableOpacity
          style={styles.recordButton}
          onPress={recording.startRecording}
        />
      )}
      {recording.recordingState === 'recording' && (
        <Image
          source={require('../assets/animations/recording.gif')}
          style={styles.recording}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  recordButton: {
    width: 75,
    height: 75,
    position: 'absolute',
    bottom: 15,
    left: '50%',
    marginLeft: -75 / 2,
    backgroundColor: '#ef233c',
    borderColor: '#9b2226',
    borderWidth: 2,
    borderRadius: 37.5,
  },
  recording: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: 75,
    height: 75,
    objectFit: 'contain',
  },
});
