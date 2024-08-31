import { useState } from 'react';
import { VideoRecorder } from './VideoRecorder';
import ReelUploader from './ReelUploader';

export interface CreatePageProps {
  uploadReel: (
    title: string,
    videoFile: string,
  ) => Promise<'success' | 'error'>;
  onUploadCompleted: () => void;
}

export function CreatePage({ onUploadCompleted, uploadReel }: CreatePageProps) {
  const [component, setComponent] = useState<'recorder' | 'uploader'>(
    'recorder',
  );
  const [videoFile, setVideoFile] = useState<string | null>(null);

  switch (component) {
    case 'recorder':
      return (
        <VideoRecorder
          onVideoRecorded={(file) => {
            setVideoFile(file);
            setComponent('uploader');
          }}
        />
      );
    case 'uploader':
      return (
        <ReelUploader
          videoFile={`${videoFile}`}
          uploadReel={uploadReel}
          onUploadCompleted={() => {
            onUploadCompleted();
          }}
          onUploadCanceled={() => {
            setComponent('recorder');
            setVideoFile(null);
          }}
        />
      );
  }
}
