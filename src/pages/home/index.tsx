import { AppRedButton } from "@/component/app_button";
import { AppContext } from "@/context/app_context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Home() {
    const myContext = useContext(AppContext);
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [coin, setCoin] = useState(0)

    useEffect(
        () => {
            if (myContext.repository.getToken() == '') {
                router.push('/login')
            }

            myContext
                .repository
                .getUserByUid(
                    myContext.repository.getToken() || ''
                )
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setName(data['data']['name'])
                    setEmail(data['data']['email'])
                    setCoin(data['data']['coin'])
                })
        }, [])

    return (
        <div className='min-h-full min-w-full'>
            <div className='min-w-full h-20 bg-slate-400 flex items-center justify-end'>
                <div className='px-4 justify-between flex min-w-full items-center'>
                    <div className='items-top flex space-x-4'>
                        <div>
                            <h2 className='font-bold text-xl'>{name}</h2>
                            <h2>{email}</h2>
                            <h2 className='font-bold text-yellow-900'>{coin} COIN</h2>
                        </div>
                    </div>
                    <AppRedButton
                        onClick={() => {
                            myContext.repository.setToken('')
                            router.push('/login')
                        }}
                        text="Logout"
                    />
                </div>
            </div>
        </div>
    )
}