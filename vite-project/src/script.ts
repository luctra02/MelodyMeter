const clientId = "8e124b2906924f8a896a5d55d01c310b"; // Replace with your client id
const params = new URLSearchParams(window.location.search);
const code = params.get("code"); 
 
export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchSongInfo(token: string): Promise<any> {
    const songName = "Never gonna give you up"
    const result = await fetch(`https://api.spotify.com/v1/search?q=${songName}&type=track`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

async function fetchAudioFeatures(token: string, id: string): Promise<any> {
    const result = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    var accessToken:string
    if (sessionStorage.getItem("accesstoken") == null) {
        accessToken = await getAccessToken(clientId, code);
        sessionStorage.setItem("accesstoken", accessToken)
    } else {
        accessToken = String(sessionStorage.getItem("accesstoken"))
    }

    const songId = await fetchSongInfo(accessToken)
    console.log(songId.tracks.items[0].id)

    const audioFeatures = await fetchAudioFeatures(accessToken, songId.tracks.items[0].id)
    console.log(audioFeatures)
    const audioFeaturesDict = {danceability: audioFeatures.danceability, energy: audioFeatures.energy, loudness: audioFeatures.loudness, positivity: audioFeatures.valence}
    console.log(audioFeaturesDict)
}
