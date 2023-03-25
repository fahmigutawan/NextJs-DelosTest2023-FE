import { AppButton, AppRedButton } from "@/component/app_button";
import { AppContext } from "@/context/app_context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { stringShortener } from "@/util/string_shortener";
import { getArticlePrice } from "@/util/get_article_price";

export default function Home() {
    const myContext = useContext(AppContext);
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [coin, setCoin] = useState(0)

    const [totalPage, setTotalPage] = useState(0)
    const [articles, setArticles] = useState(
        new Array<{
            article_id: string;
            image: string;
            title: string;
            article_value: string;
            modified_time_inmillis: number;
            author: string;
            total_page: number;
        }>()
    )

    let intPage = router.query['page']

    useEffect(() => {
        if (articles.length > 0) {
            if (typeof (articles[0].total_page) !== 'undefined') {
                setTotalPage(articles[0].total_page)
            }
        }

    }, [articles.length])

    useEffect(
        () => {
            myContext.repository.getArticleByPage(
                intPage,
                (data) => {
                    setArticles(
                        data.map(item => {
                            return {
                                article_id: item.article_id,
                                image: item.image,
                                title: item.title,
                                article_value: item.article_value,
                                modified_time_inmillis: item.modified_time_inmillis,
                                author: item.author,
                                total_page: item.total_page
                            }
                        })
                    )

                },
                (error) => {
                    alert(error)
                }
            )
            if (myContext.repository.getLoginState() === 'false') {
                router.push('/login')
            }

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
        }, [intPage])

    return (
        <div className='min-w-full min-h-screen'>
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
                <div className='flex justify-center items-center'>
                    <div className='space-y-4 w-screen py-6'>
                        {
                            articles.map(s => {
                                const price = getArticlePrice(Date.now(), s.modified_time_inmillis)
                                return (
                                    <div key={s.article_id} className='px-20 h-4/6'>
                                        <div className='h-2/3 w-full bg-slate-100 shadow-md rounded-xl overflow-hidden'>
                                            <div className='flex'>
                                                <div>
                                                    <img src={s.image} alt="" />
                                                </div>
                                                <div className='px-4 py-3 flex flex-col justify-between'>
                                                    <div>
                                                        <h1 className='font-bold text-xl'>{s.title}</h1>
                                                        <h3>{stringShortener(s.article_value)}</h3>
                                                    </div>
                                                    <div className='flex space-x-1'>
                                                        <h5 className='font-semibold text-lg'>Price: </h5>
                                                        <h5 className='font-semibold text-lg'>{(price > 0) ? price : 'FREE'}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>


            <div className='flex justify-center space-x-4 items-center bottom-0 min-w-full px-4 py-4'>
                <button className='rounded-xl shadow-sm bg-slate-500 active:bg-slate-300 hover:bg-slate-400 px-2 py-2 cursor-pointer'
                    onClick={() => {
                        if (parseInt((typeof (intPage) !== 'undefined') ? intPage[0] : '1') > 1) {
                            router.push('/home?page=' + (parseInt((typeof (intPage) !== 'undefined') ? intPage[0] : '1') - 1))
                        } else {
                            alert('Have been on end of the pages')
                        }
                    }}>
                    <KeyboardArrowLeftIcon />
                </button>
                <h3 className='text-lg'>{router.query['page'] || '1'}</h3>
                <button className='rounded-xl shadow-sm bg-slate-500 active:bg-slate-300 hover:bg-slate-400 px-2 py-2 cursor-pointer'
                    onClick={() => {
                        if (parseInt((typeof (intPage) !== 'undefined') ? intPage[0] : '1') < totalPage) {
                            router.push('/home?page=' + (parseInt((typeof (intPage) !== 'undefined') ? intPage[0] : '1') + 1))
                        } else {
                            alert('Have been on end of the pages')
                        }
                    }}>
                    <KeyboardArrowRightIcon />
                </button>
            </div>
        </div>
    )
}