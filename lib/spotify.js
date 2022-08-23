import SpotifyWebApi from "spotify-web-api-node"

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played"
].join(",")

const params = {
    scope: scopes
}

const queryParamsString = new URLSearchParams(params).toString();

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString}`

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.spotify_client_id,
    clientSecret: process.env.spotify_client_secret
})

export default spotifyApi