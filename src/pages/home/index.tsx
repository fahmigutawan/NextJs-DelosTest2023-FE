import { AppButton, AppRedButton } from "@/component/app_button";
import { AppContext } from "@/context/app_context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function Home() {
    const myContext = useContext(AppContext);
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [coin, setCoin] = useState(0)

    useEffect(
        () => {
            if (myContext.repository.getLoginState() === 'false') {
                router.push('/login')
            }

            //HANDLE GET USER
        }, [])

    return (
        <div className='min-h-full min-w-full'>
            <div>
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
                                myContext.repository.setLoginState('false')
                                router.push('/login')
                            }}
                            text="Logout"
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-center space-x-4 items-center'>
                <div className='rounded-xl shadow-sm bg-slate-500 active:bg-slate-300 hover:bg-slate-400 px-2 py-2 cursor-pointer'
                    onClick={() => { }}>
                    <KeyboardArrowLeftIcon />
                </div>
                <h3 className='text-lg'>{router.query['page'] || '1'}</h3>
                <div className='rounded-xl shadow-sm bg-slate-500 active:bg-slate-300 hover:bg-slate-400 px-2 py-2 cursor-pointer'
                    onClick={() => { }}>
                    <KeyboardArrowRightIcon />
                </div>
            </div>
        </div>
    )
}