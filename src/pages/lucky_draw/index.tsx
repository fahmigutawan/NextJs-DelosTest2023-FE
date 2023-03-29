import { AppButton } from "@/component/app_button";
import { AppContext } from "@/context/app_context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function LuckyDraw() {
    const myContext = useContext(AppContext);
    const router = useRouter()

    const [tracker, setTracker] = useState(0)
    const [ticket, setTicket] = useState(0)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        myContext.repository.getLuckyDrawInfo(
            myContext.repository.getEmail() || '',
            (data) => {
                setTracker(data.recent_coin_track)
                setTicket(data.ticket)
            },
            (error) => { }
        )
    }, [])

    useEffect(() => {
        if (loading) {
            myContext.repository.luckyDraw(
                myContext.repository.getEmail() || '',
                (msg) => {
                    setTicket(ticket - 1)
                    alert(msg)
                    setLoading(false)
                },
                (error) => {
                    alert(error)
                    setLoading(false)
                }
            )
        }
    }, [loading])

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-5xl'>Lucky Draw</h1>
            <img className='w-2/12' src="https://png.pngtree.com/element_our/png/20181228/coin-vector-icon-png_296039.jpg" alt="" />
            <h2 className='font-medium text-3xl'>{"Available ticket : " + ticket}</h2>
            <h2 className='font-medium text-xl'>{"Spent " + (50000 - tracker) + " again to get 3 more tickets"}</h2>

            <div className='py-10'>
                {
                    (loading)
                        ? <div className='flex justify-center items-center'>
                            <div className='inline-block w-24 h-24 border-8 border-t-amber-500 border-r-blue-500 border-b-rose-500 border-l-green-500 rounded-full animate-spin' />
                        </div>
                        : <AppButton
                            onClick={() => {
                                setLoading(true)
                            }}
                            text="Spin with 1 ticket"
                        />
                }
            </div>
        </div>
    )
}