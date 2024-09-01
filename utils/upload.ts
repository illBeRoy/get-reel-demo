import { FileSystemUploadType, uploadAsync } from 'expo-file-system';

export function uploadVideo(filePath: string, uploadUrl: string) {
  return uploadAsync(uploadUrl, filePath, {
    fieldName: 'file',
    uploadType: FileSystemUploadType.MULTIPART,
  });
}
