import { expect, it } from 'vitest';
import fetchAudioFeatures, {
  fetchAlbum,
  fetchAlbumTracks,
  fetchArtist,
  fetchPlaylistTracks,
  fetchPlaylists,
  fetchSongInfo,
  fetchTracks,
  getAccessToken,
} from '../src/script';
const accessToken = await getAccessToken();

it('fetchSongInfo', async () => {
  const songInfo = await fetchSongInfo(accessToken, 'Primera Vez');
  expect(songInfo.tracks.items[0].id).toMatchInlineSnapshot('"4NTS7CQpkbrf6hvAznaUYc"');
});

it('fetchAudioFeatures', async () => {
  const audioFeatures = await fetchAudioFeatures(accessToken, '4NTS7CQpkbrf6hvAznaUYc');
  expect(audioFeatures.danceability).toMatchInlineSnapshot('0.59');
});

it('fetchArtist', async () => {
  const artistInfo = await fetchArtist(accessToken, 'Rick Astley');
  const artistName = (Object.values(artistInfo.artists.items)[0] as { id: string }).id;
  expect(artistName).toMatchInlineSnapshot('"0gxyHStUsqpMadRV0Di1Qt"');
});

it('fetchAlbum', async () => {
  const albumInfo = await fetchAlbum(accessToken, 'Rick Astley');
  const albumObject = Object.values(albumInfo.albums.items)[3];
  expect(albumObject.name).toMatchInlineSnapshot('"The Best of Me"');
  expect(albumObject.id).toMatchInlineSnapshot('"2N4vVTdKNVHn6T5rYRJnIS"');
});

it('fetchPlaylist', async () => {
  const playlistsInfo = await fetchPlaylists(accessToken, 'Indila');

  const playlistObjectName = Object.values(playlistsInfo.playlists.items)[0].name;
  const playlistObjectId = Object.values(playlistsInfo.playlists.items)[0].id;
  expect(playlistObjectName).toMatchInlineSnapshot('"Indila Mix"');
  expect(playlistObjectId).toMatchInlineSnapshot('"37i9dQZF1EIVUwM1vK87NG"');
});

it('fetchAlbumTracks', async () => {
  const albumTracksInfo = await fetchAlbumTracks(accessToken, '2N4vVTdKNVHn6T5rYRJnIS');
  const albumTracksObject = Object.values(albumTracksInfo.tracks.items)[1];
  const albumTracksObjectName = (albumTracksObject as { name: string }).name;
  const albumTracksObjectDurationMs = (albumTracksObject as { duration_ms: number }).duration_ms;
  expect(albumTracksObjectName).toMatchInlineSnapshot('"Never Gonna Give You Up"');
  expect(albumTracksObjectDurationMs).toMatchInlineSnapshot('213960');
});

it('fetchPlaylistTracks', async () => {
  const playlistTracksInfo = await fetchPlaylistTracks(accessToken, '37i9dQZF1EIVUwM1vK87NG');
  const playlistTracksObject = Object.values(playlistTracksInfo.tracks.items)[17];
  console.log(playlistTracksObject);
  const playlistTracksObjectName = (playlistTracksObject as { track: { name: string } }).track.name;
  const playlistTracksObjectDurationMs = (playlistTracksObject as { track: { duration_ms: number } }).track.duration_ms;
  expect(playlistTracksObjectName).toMatchInlineSnapshot('"I\'m Good (Blue)"');
  expect(playlistTracksObjectDurationMs).toMatchInlineSnapshot('175238');
});

it('fetchTracks', async () => {
  const trackInfo = await fetchTracks(accessToken, '4NTS7CQpkbrf6hvAznaUYc');
  expect(trackInfo.name).toMatchInlineSnapshot('"Primera Vez"');
  expect(trackInfo.album.images[0].url).toMatchInlineSnapshot(
    '"https://i.scdn.co/image/ab67616d0000b273ab497e0fae9d1c8ef2e7a165"',
  );
});
