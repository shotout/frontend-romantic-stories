// import TrackPlayer from 'react-native-track-player';

// export default async function() {
//   TrackPlayer.addEventListener('remote-play', () => {
//     TrackPlayer.play();
//   });

//   TrackPlayer.addEventListener('remote-pause', () => {
//     TrackPlayer.pause();
//   });

//   TrackPlayer.addEventListener('remote-stop', () => {
//     TrackPlayer.destroy();
//   });

//   TrackPlayer.addEventListener('remote-next', () => {
//     TrackPlayer.skipToNext();
//   });

//   TrackPlayer.addEventListener('remote-previous', () => {
//     TrackPlayer.skipToPrevious();
//   });

//   TrackPlayer.addEventListener('remote-seek', (event) => {
//     TrackPlayer.seekTo(event.position);
//   });

//   TrackPlayer.addEventListener('remote-jump-forward', (event) => {
//     // Jump forward by a specific amount of seconds (e.g., 15 seconds)
//     TrackPlayer.seekTo(event.position + 15);
//   });

//   TrackPlayer.addEventListener('remote-jump-backward', (event) => {
//     // Jump backward by a specific amount of seconds (e.g., 15 seconds)
//     TrackPlayer.seekTo(event.position - 15);
//   });

//   await TrackPlayer.setupPlayer({});
// }
