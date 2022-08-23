import useSpotify from "../hooks/useSpotify"
import Image from "next/image"
import moment from "moment"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"

const Song = ({ track, order }) => {
    const spotify = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotify.play({
            uris: [track.track.uri]
        })
    }

    return (
        <div onClick={playSong} className={`grid grid-cols-2 text-gray-500 py-4 px-5 ${currentTrackId === track.track.id && "bg-gray-900"} hover:bg-gray-900 rounded-lg cursor-pointer`}>
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <div>
                    <Image
                        src={track.track.album.images[0].url}
                        width={40}
                        height={40}
                        alt={track.track.name}
                    />
                </div>
                <div>
                    <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
                    <p className="w-40 truncate">{track.track.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 truncate hidden md:inline">{track.track.album.name}</p>
                <p>{moment.utc(track.track.duration_ms).format("mm:ss")}</p>
            </div>
        </div>
    )
}

export default Song