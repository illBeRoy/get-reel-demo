import { Image, StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import { VideoView, useVideoPlayer } from 'expo-video';

interface FeedPageProps {
  reels: Reel[];
}

export interface Reel {
  title: string;
  user: string;
  video: string;
}

export function FeedPage({ reels }: FeedPageProps) {
  if (reels.length === 0) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/animations/feed.gif')} />
      </View>
    );
  }

  return (
    <PagerView
      style={styles.container}
      orientation="vertical"
      offscreenPageLimit={2}
    >
      {reels.map((reel) => (
        <ReelVideo key={reel.title} reel={reel} />
      ))}
    </PagerView>
  );
}

export interface ReelVideoProps {
  reel: Reel;
}

export const ReelVideo = ({ reel }: ReelVideoProps) => {
  const player = useVideoPlayer(reel.video, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={reelStyles.video}
        player={player}
        contentFit="cover"
        nativeControls={false}
      />
      <View style={reelStyles.floatingDetails}>
        <Text style={reelStyles.userText}>{reel.user}</Text>
        <Text style={reelStyles.titleText}>{reel.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

const reelStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  video: {
    flex: 1,
    width: '100%',
  },
  floatingDetails: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 15,
    gap: 10,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  userText: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleText: {
    color: 'white',
  },
});
