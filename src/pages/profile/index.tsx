import { AppButton } from "@/component/app_button";
import { AppContext } from "@/context/app_context";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Profile() {
    const myContext = useContext(AppContext);
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [coin, setCoin] = useState(0)

    const profilePict = 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'

    useEffect(() => {
        myContext
            .repository
            .getUserByEmail(
                myContext.repository.getEmail() || '',
                (data) => {
                    setName(data.name)
                    setEmail(data.email)
                    setCoin(parseInt(data.coin))
                },
                (error) => {
                    //TODO
                }
            )
    }, [])

    return (
        <div>
            <Head>
                <title>DelosNews | Profile</title>
            </Head>
            <div className='space-y-6'>
                <div className='flex flex-col justify-center items-center space-y-1'>
                    <img className='w-1/3' src={profilePict} alt="" />
                    <h1 className='font-bold text-4xl'>{name}</h1>
                    <h2>{email}</h2>
                    <h2 className='font-medium text-lg text-yellow-700'>{coin}</h2>
                </div>
                <div className='flex flex-col space-y-2 justify-center items-center'>
                    <AppButton
                        onClick={() => {
                            router.push('owned_article')
                        }}
                        text="See Owned Article"
                    />
                    <AppButton
                        onClick={() => {
                            router.push('lucky_draw')
                        }}
                        text="Lucky Draw"
                    />
                </div>
            </div>
        </div>
    )
}