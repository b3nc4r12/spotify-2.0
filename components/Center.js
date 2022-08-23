import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import { useRecoilValue, useRecoilState } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"
import moment from "moment"
import Songs from "./Songs"

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
]

const Center = () => {
    const { data: session } = useSession();
    const spotify = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const totalSecs = playlist?.tracks?.items?.map((track) => track?.track?.duration_ms / 1000)?.reduce((a, b) => a + b, 0);

    useEffect(() => setColor(shuffle(colors).pop()), [playlistId]);

    useEffect(() => {
        spotify.getPlaylist(playlistId)
            .then((data) => setPlaylist(data.body))
            .catch((error) => console.log("Something went wrong", error))
    }, [spotify, playlistId])

    return (
        <section className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
            {/* Header */}
            <header className="absolute top-5 right-8">
                <div
                    onClick={signOut}
                    className="flex items-center space-x-3 bg-black opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
                >
                    <Image
                        src={session?.user?.image}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5" />
                </div>
            </header>

            {/* Playlist Info */}
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img
                    src={playlist?.images?.[0]?.url}
                    alt={playlist?.name}
                    className="h-44 w-44 shadow-2xl object-cover"
                />
                <div className="font-light">
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                    <p className="text-sm mt-5">
                        <span className="font-semibold">{playlist?.owner?.display_name} • </span>
                        {playlist?.followers?.total} likes •{" "}
                        {playlist?.tracks?.total} songs,
                        <span className="text-gray-500">
                            {" "}{moment.utc(totalSecs * 1000).format("h")} h {moment.utc(totalSecs * 1000).format("mm")} min
                        </span>
                    </p>
                </div>
            </section>

            <Songs />
        </section>
    )
}

export default Center