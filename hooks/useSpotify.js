import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.spotify_client_id,
    clientSecret: process.env.spotify_client_secret
})

const useSpotify = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            if (session.error === "RefreshAccessTokenError") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session])

    return spotifyApi
}

export default useSpotify
