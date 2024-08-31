import type { CameraRecordingOptions, CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

export const useRecording = (options: CameraRecordingOptions) => {
  const cameraRef = useRef<CameraView | null>(null);
  const [recordingState, setRecordingState] = useState<
    'not ready' | 'camera ready' | 'recording' | 'success'
  >('not ready');
  const [recordingFile, setRecordingFile] = useState<string | null>(null);

  useEffect(() => {
    if (recordingState === 'not ready' && cameraRef.current) {
      setRecordingState('camera ready');
    }

    if (!cameraRef.current) {
      setRecordingState('not ready');
    }
  }, [cameraRef.current]);

  async function startRecording() {
    if (cameraRef.current && recordingState !== 'recording') {
      setRecordingState('recording');
      try {
        const recording = await cameraRef.current.recordAsync(options);
        setRecordingState('success');
        setRecordingFile(recording!.uri);
      } catch (err) {
        setRecordingState('camera ready');
        setRecordingFile(null);
      }
    }
  }

  return {
    ref: cameraRef,
    recordingState,
    recordingFile,
    startRecording,
  };
};
