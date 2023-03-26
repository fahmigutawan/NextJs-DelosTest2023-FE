import { AppContext } from "@/context/app_context";
import { getArticlePrice } from "@/util/get_article_price";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ArticleDetail() {
    const myContext = useContext(AppContext);
    const router = useRouter()
    const article_id = router.query['id']
    const [data, setData] = useState<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; abstract: string; date: string }>()

    useEffect(() => {
        myContext.repository.getArticleById(
            article_id,
            (fethedData) => {
                setData(fethedData)
            },
            (error) => {
                //TODO
            }
        )
    }, [article_id])

    if (typeof (data) !== 'undefined') {
        return (
            <div className='w-full h-full space-y-4 px-16 py-6'>
                <div className='w-full flex items-center justify-center'>
                    <img src={data.image} alt="" />
                </div>
                <div className='text-center'>
                    <h1 className='font-bold text-lg'>{data.title}</h1>
                </div>
                <div>
                    <h2>{data.abstract}</h2>
                </div>
                <div className='flex justify-center'>
                    <div className='flex justify-between bg-slate-100 w-2/4 rounded-xl px-4 py-3 shadow-md'>
                        <div>
                            <h3 className='text-2xl font-bold'>Price: {(getArticlePrice(Date.now(), data.modified_time_inmillis) > 0) ? getArticlePrice(Date.now(), data.modified_time_inmillis) : 'FREE'}</h3>
                            <h3>Author: {data.author}</h3>
                            <h3>Posted date: {data.date}</h3>
                        </div>
                        <button
                            className='flex flex-col justify-center items-center bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-400 rounded-xl px-4 py-3'
                            onClick={() => {
                                myContext.repository.addArticleToCart(
                                    myContext.repository.getEmail() || '',
                                    article_id,
                                    () => {
                                        alert('Article successfully bought')
                                    },
                                    (error) => {
                                        alert(error)
                                    }
                                )
                            }}
                        >
                            <AddShoppingCartIcon />
                            <p className='font-semibold text-xl'>BUY</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}