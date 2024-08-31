import { useEffect, useState } from 'react';
import { useWixModules } from '@wix/sdk-react';
import { media } from '@wix/sdk';
import * as data from '@wix/data';
import { FeedPage, Reel } from '../../components/FeedPage';

export default function HomePage() {
  const wix = useWixModules({ data });
  const [reels, setReels] = useState<Reel[]>([]);

  useEffect(() => {
    async function fetchReels() {
      const results = await wix.data.items
        .queryDataItems({ dataCollectionId: 'Reels' })
        .find();

      setReels(
        results.items.map((result) => ({
          title: result.data?.title,
          user: result.data?.user,
          video: media.getVideoUrl(result.data?.video).url,
        })),
      );
    }

    fetchReels();
  }, []);

  return <FeedPage reels={reels} />;
}
