import useSpotify from "../hooks/useSpotify"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import { useCallback, useEffect, useState } from "react"
import useSongInfo from "../hooks/useSongInfo"
import { HeartIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline"
import {
    RewindIcon,
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    VolumeUpIcon,
    SwitchHorizontalIcon
} from "@heroicons/react/solid"
import { debounce } from "lodash"

const Player = () => {
    const spotify = useSpotify();
    const songInfo = useSongInfo();
    const { data: session } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const handlePlayPause = () => {
        spotify.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotify.pause();
                setIsPlaying(false);
            } else {
                spotify.play();
                setIsPlaying(true);
            }
        })
    }

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotify.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data.body.item.id);

                spotify.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotify.setVolume(volume).catch((error) => { })
        }, 500),
        []
    )

    useEffect(() => {
        if (spotify.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotify, session])

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume, spotify])

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* Left */}
            <div className="flex items-center space-x-4">
                <div className="hidden md:inline h-10 w-10">
                    <Image
                        src={songInfo?.album?.images?.[0]?.url}
                        width={40}
                        height={40}
                        alt={songInfo?.name}
                    />
                </div>
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.map((artist) => artist.name).join(", ")}</p>
                </div>
            </div>

            {/* Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon
                    // onClick={() => spotify.skipToPrevious()} - API is not working
                    className="button"
                />

                {isPlaying ? (
                    <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
                ) : (
                    <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
                )}

                <FastForwardIcon
                    // onClick={() => spotify.skipToNext()} - API is not working
                    className="button"
                />
                <ReplyIcon className="button" />
            </div>

            {/* Right */}
            <div className="flex items-center justify-end space-x-3 md:space-x-4 pr-5">
                <VolumeDownIcon
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                    className="button"
                />
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-14 md:w-28"
                />
                <VolumeUpIcon
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    className="button"
                />
            </div>
        </div>
    )
}

export default Player