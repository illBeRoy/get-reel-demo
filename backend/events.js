import wixMediaBackend from 'wix-media-backend';
import wixData from 'wix-data';

/**
 * @param {wixMediaBackend.Events.FileEvent} event
 */
export async function wixMediaManager_onFileUploaded(event) {
  const { uploadId, title, user, type } = event.context;
  if (type !== 'userUpload' || !uploadId || !title || !user) {
    return;
  }

  await wixData.insert('Reels', {
    title,
    user,
    video: event.fileInfo.fileUrl,
  });
}
