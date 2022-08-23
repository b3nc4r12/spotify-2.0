import { signIn } from "next-auth/react"
import Head from "next/head"

const Login = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <div className="flex flex-col bg-black min-h-screen items-center justify-center">
                <img
                    src="https://links.papareact.com/9xl"
                    alt="Spotify Logo"
                    className="w-52 mb-5"
                />
                <div>
                    <button
                        onClick={() => signIn("spotify", { callbackUrl: "/" })}
                        className="bg-[#18d860] text-white p-5 rounded-full"
                    >
                        Login with Spotify
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login