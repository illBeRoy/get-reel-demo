import { ok, badRequest, forbidden } from 'wix-http-functions';
import wixMediaBackend from 'wix-media-backend';
import wixMembers from 'wix-members-backend';
import crypto from 'crypto';

/**
 * @param {import('wix-http-functions').WixHttpFunctionRequest} request
 * @returns {Promise<import('wix-http-functions').WixHttpFunctionResponse>}
 */
export async function post_prepareReelUpload(request) {
  const uploadId = crypto.randomUUID();

  const myMember = await wixMembers.currentMember.getMember().catch(() => null);

  if (!myMember) {
    return forbidden({ body: 'Only members can post reels' });
  }

  const { title } = await request.body.json();

  if (!title) {
    return badRequest({ body: 'No title provided for reel' });
  }

  const { uploadUrl } = await wixMediaBackend.mediaManager.getUploadUrl(
    `/userContent`,
    {
      mediaOptions: {
        mediaType: 'video',
        mimeType: 'video/mp4',
      },
      metadataOptions: {
        fileName: `${uploadId}.mp4`,
        context: {
          type: 'userUpload',
          uploadId,
          title,
          user: myMember.profile.nickname,
        },
      },
    },
  );

  return ok({
    body: {
      uploadId,
      uploadUrl: uploadUrl,
    },
  });
}
