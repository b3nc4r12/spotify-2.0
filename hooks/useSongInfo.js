import useSpotify from "./useSpotify"
import { useRecoilValue } from "recoil"
import { currentTrackIdState } from "../atoms/songAtom"
import { useEffect, useState } from "react"

const useSongInfo = () => {
    const spotify = useSpotify();
    const currentTrackId = useRecoilValue(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await spotify.getTrack(currentTrackId);
                setSongInfo(trackInfo.body);
            }
        }

        fetchSongInfo();
    }, [spotify, currentTrackId])

    return songInfo
}

export default useSongInfo