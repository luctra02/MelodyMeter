const clientId = '8e124b2906924f8a896a5d55d01c310b'; // Replace with your client id
const secretId = '31a8d64235f2429295252b7fdd3f1387';

interface SpotifyImage {
  url: string;
}

interface SpotifyArtist {
  artists: { items: [] };
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
}

interface SpotifyTrackResponse {
  energy: number;
  loudness: number;
  valence: number;
  danceability: number;
  tracks: {
    items: SpotifyTrack[];
  };
}

interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  images: SpotifyImage[];
}

interface SpotifyAlbumsResponse {
  albums: {
    items: SpotifyAlbum[];
  };
}

interface SpotifyPlaylistsResponse {
  playlists: {
    items: SpotifyPlaylist[];
  };
}

interface SpotifyTrackInfo {
  tracks: { items: [] };
  name: string;
  album: {
    images: SpotifyImage[];
  };
}

export async function getAccessToken(clientId: string): Promise<string> {
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', secretId);
  params.append('grant_type', 'client_credentials');
  params.append('redirect_uri', 'http://localhost:5173/callback');

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

export async function fetchSongInfo(token: string | null, searchTerm: string): Promise<SpotifyTrackResponse> {
  const result = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export default async function fetchAudioFeatures(token: string | null, id: string): Promise<SpotifyTrackResponse> {
  const result = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchArtist(token: string | null, name: string): Promise<SpotifyArtist> {
  const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchAlbum(token: string | null, name: string): Promise<SpotifyAlbumsResponse> {
  const result = await fetch(`https://api.spotify.com/v1/search?q=artist:${name}&type=album`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchPlaylists(token: string | null, name: string): Promise<SpotifyPlaylistsResponse> {
  console.log(name);
  const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=playlist`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchAlbumTracks(token: string | null, id: string): Promise<SpotifyTrackInfo> {
  const result = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchPlaylistTracks(token: string | null, id: string): Promise<SpotifyTrackInfo> {
  const result = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchTracks(token: string | null, id: string): Promise<SpotifyTrackInfo> {
  const result = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

async function main() {
  let accessToken;
  if (sessionStorage.getItem('accesstoken') == null) {
    accessToken = await getAccessToken(clientId);
    sessionStorage.setItem('accesstoken', accessToken);
  } else {
    // Handle the case when the token is already in sessionStorage
    accessToken = String(sessionStorage.getItem('accesstoken'));
  }
}

main();
