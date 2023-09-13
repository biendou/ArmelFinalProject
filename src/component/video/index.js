import Video from 'react-native-video';
import {StyleSheet} from 'react-native';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
const VideoC = () => {
  return (
    <Video
      source={require('../../../video.mp4')} // Can be a URL or a local file.
      ref={ref => {
        this.player = ref;
      }} // Store reference
      onBuffer={this.onBuffer} // Callback when remote video is buffering
      onError={this.videoError} // Callback when video cannot be loaded
      style={styles.backgroundVideo}
      repeat={true}
      resizeMode={'cover'}
      muted={true}
      //   fullscreen={true}
    />
  );
};
// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: -300,
    bottom: 0,
    right: 0,
    height: '100%',
  },
});

export default VideoC;
