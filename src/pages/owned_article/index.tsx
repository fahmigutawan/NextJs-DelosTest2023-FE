import { AppContext } from "@/context/app_context";
import { getArticlePrice } from "@/util/get_article_price";
import { stringShortener } from "@/util/string_shortener";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function OwnedArticle() {
    const myContext = useContext(AppContext);
    const router = useRouter()

    const [articles, setArticles] = useState(
        new Array<{
            article_id: string;
            image: string;
            title: string;
            article_value: string;
            modified_time_inmillis: number;
            author: string;
            abstract: string;
            owned: boolean;
        }>()
    )

    useEffect(() => {
        myContext.repository.getOwnedArticle(
            myContext.repository.getEmail() || '',
            (data) => {
                setArticles(data)
            },
            (error) => { }
        )
    }, [])

    return (
        <div>
            <h1 className='flex justify-center font-bold text-3xl py-6'>Owned Articles</h1>
            <div className='space-y-6'>
                {articles.map(s => {
                    const price = getArticlePrice(Date.now(), s.modified_time_inmillis)
                    const date = new Date()
                    date.setTime(s.modified_time_inmillis)

                    return (
                        <div
                            key={s.article_id}
                            className='px-20 h-4/6'
                        >
                            <div
                                className='h-2/3 w-full bg-slate-100 shadow-md rounded-xl overflow-hidden active:bg-slate-300 hover:bg-slate-200 cursor-pointer'
                                onClick={() => {
                                    router.push('/detail?id=' + s.article_id)
                                }}
                            >
                                <div className='flex'>
                                    <div>
                                        <img src={s.image} alt="" />
                                    </div>
                                    <div className='px-4 py-3 flex flex-col justify-between'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <h1 className='font-bold text-xl'>{s.title}</h1>
                                                <h3>{stringShortener(s.abstract)}</h3>
                                            </div>

                                        </div>
                                        <div>
                                            <div className='flex space-x-1 items-baseline'>
                                                <h5 className='font-semibold text-lg'>Price:</h5>
                                                <h5>{(s.owned) ? '-' : ((price > 0) ? price : 'FREE')}</h5>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div>
                                                    {(s.owned) ? <p className='text-yellow-500 font-bold text-xl'>OWNED</p> : <p className='text-red-500 font-bold text-xl'>NOT OWNED YET</p>}
                                                </div>
                                                <div className='flex space-x-4'>
                                                    <div className='flex space-x-1 items-baseline'>
                                                        <h5 className='font-semibold text-lg'>Author:</h5>
                                                        <h5>{s.author}</h5>
                                                    </div>
                                                    <div className='flex space-x-1 items-baseline'>
                                                        <h5 className='font-semibold text-lg'>Posted:</h5>
                                                        <h5>{date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes()}</h5>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}