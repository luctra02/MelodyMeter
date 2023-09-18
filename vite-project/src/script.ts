const clientId = "8e124b2906924f8a896a5d55d01c310b"; // Replace with your client id
const secretId = "31a8d64235f2429295252b7fdd3f1387"

export async function getAccessToken(clientId: string): Promise<string> {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", secretId)
    params.append("grant_type", "client_credentials");
    params.append("redirect_uri", "http://localhost:5173/callback");

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

export async function fetchSongInfo(token: string, searchTerm: string): Promise<any> {
    console.log(searchTerm)
    const result = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export default async function fetchAudioFeatures(token: string | null, id: string): Promise<any> {
    const result = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export async function fetchArtist(token: string | null, name: string): Promise<any> {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

var accessToken:string
if (sessionStorage.getItem("accesstoken") == null) {
    accessToken = await getAccessToken(clientId);
    sessionStorage.setItem("accesstoken", accessToken)
} else {
    accessToken = String(sessionStorage.getItem("accesstoken"))
}

/* const songInfo = await fetchSongInfo(accessToken)
console.log(songInfo.tracks.items[0].id)

const audioFeatures = await fetchAudioFeatures(accessToken, songInfo.tracks.items[0].id)
console.log(audioFeatures)
const audioFeaturesDict = {danceability: audioFeatures.danceability, energy: audioFeatures.energy, loudness: audioFeatures.loudness, positivity: audioFeatures.valence}
console.log(audioFeaturesDict) */