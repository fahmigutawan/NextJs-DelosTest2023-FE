import { generateUuid } from "../../../util/generate_uuid";
import { getArticlePrice } from "../../../util/get_article_price";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export class SupabaseSource {
    supabase = createClient('https://xsnlxhmynqxqcatiizal.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzbmx4aG15bnF4cWNhdGlpemFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk0Njk5NTYsImV4cCI6MTk5NTA0NTk1Nn0.now3Tc7qqVPynJ3wealEdCDDj2B55ghH-AuzfyC4raU')

    register = async (email: string, password: string, name: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        //check email
        this.supabase
            .from('user')
            .select('email')
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    onFailed(error.message)
                    return
                }

                if (data.length > 0) {
                    onFailed('Email has been registered, try another email')
                    return
                }

                const generatedUid = generateUuid()

                //register
                this.supabase
                    .from('user')
                    .insert({
                        uid: generatedUid,
                        email: email,
                        password: password,
                        name: name
                    })
                    .then(({ data, error }) => {
                        if (error) {
                            onFailed(error.message)
                            return
                        }

                        this.supabase
                            .from('coin_50000_track')
                            .insert({
                                uid: generatedUid,
                                recent_coin_track: 0
                            }).then(({ data, error }) => {
                                if (error) {
                                    onFailed(error.message)
                                    return
                                }

                                onSuccess()
                            })
                    })
            })
    }

    login = async (email: string, password: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        this.supabase
            .from('user')
            .select('email, password')
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    onFailed(error.message)
                    return
                }

                if (data.length == 0) {
                    onFailed('Email has not been registered, try to register first')
                    return
                }

                const user = data.map(row => {
                    return {
                        email: String(row.email),
                        password: String(row.password)
                    }
                })

                if (user[0].email == email && user[0].password == password) {
                    onSuccess()
                } else {
                    onFailed('Email or Password are incorrect')
                }
            })
    }

    getUserByEmail = async (email: string, onSuccess: (data: { email: string; name: string; coin: string; }) => void, onFailed: (message: string) => void) => {
        this.supabase
            .from('user')
            .select('email, name, coin')
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    onFailed(error.message)
                    return
                }

                if (data.length == 0) {
                    onFailed('User not found')
                    return
                }

                const parsedData = data.map(row => {
                    return {
                        email: String(row.email),
                        name: String(row.name),
                        coin: String(row.coin)
                    }
                })[0]

                onSuccess(parsedData)
            })
    }

    getArticleByPage = (
        email: string,
        page: number,
        onSuccess: (
            data: Array<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; total_page: number; abstract: string; owned: boolean }>
        ) => void,
        onFailed: (message: string) => void
    ) => {
        if (isNaN(page)) {
            onFailed('Insert the correct page')
            return
        }

        let totalPage = 0
        let ownedArticleId: string[] = []

        this.supabase
            .from('user')
            .select('uid')
            .eq('email', email)
            .then(({ data, error }) => {
                if (data !== null) {
                    this.supabase
                        .from('user_article')
                        .select('uid, article_id')
                        .eq('uid', data[0].uid)
                        .then(({ data, error }) => {
                            if (error) {
                                onFailed(error.message)
                                return
                            }

                            ownedArticleId = data.map(row => {
                                return String(row.article_id)
                            })

                            this.supabase
                                .from('article')
                                .select('*')
                                .then(({ data, error }) => {
                                    if (error) {
                                        onFailed('Error to fetch data from database')
                                        return
                                    }

                                    totalPage = Math.ceil(data.length / 5)
                                    if (page > totalPage) {
                                        onFailed('Your page is bigger than actual page, try to refresh with correct page')
                                        return
                                    }
                                })

                            this.supabase
                                .from('article')
                                .select('no, article_id, image, title, article_value, modified_time_inmillis, author, abstract')
                                .order('no', { ascending: false })
                                .range(page * 5 - 5, page * 5 - 1)
                                .then(({ data, error }) => {
                                    if (error) {
                                        onFailed(error.message)
                                        return
                                    }

                                    onSuccess(
                                        data.map(row => {
                                            let isOwned = false
                                            if (ownedArticleId.includes(String(row.article_id))) {
                                                isOwned = true
                                            }

                                            return {
                                                article_id: String(row.article_id),
                                                image: String(row.image),
                                                title: String(row.title),
                                                article_value: String(row.article_value),
                                                modified_time_inmillis: parseInt(String(row.modified_time_inmillis)),
                                                author: String(row.author),
                                                total_page: totalPage,
                                                abstract: String(row.abstract),
                                                owned: isOwned
                                            }
                                        })
                                    )
                                })
                        })
                }
            })
    }

    getArticleByPageAndQuery = (
        email: string,
        page: number,
        query: string,
        onSuccess: (data: Array<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; total_page: number; abstract: string; owned: boolean }>) => void,
        onFailed: (message: string) => void
    ) => {
        if (isNaN(page)) {
            onFailed('Insert the correct page')
            return
        }

        let totalPage = 0
        let ownedArticleId: string[] = []

        this.supabase
            .from('user')
            .select('uid')
            .eq('email', email)
            .then(({ data, error }) => {
                if (data !== null) {
                    this.supabase
                        .from('user_article')
                        .select('uid, article_id')
                        .eq('uid', data[0].uid)
                        .then(({ data, error }) => {
                            if (error) {
                                onFailed(error.message)
                                return
                            }

                            ownedArticleId = data.map(row => {
                                return String(row.article_id)
                            })

                            this.supabase
                                .from('article')
                                .select('*')
                                .filter('title', 'ilike', '%' + query + '%')
                                .then(({ data, error }) => {
                                    if (error) {
                                        onFailed('Error to fetch data from database')
                                        return
                                    }

                                    totalPage = Math.ceil(data.length / 5)
                                    if (page > totalPage) {
                                        onFailed('Your page is bigger than actual page, try to refresh with correct page')
                                        return
                                    }
                                })

                            this.supabase
                                .from('article')
                                .select('no, article_id, image, title, article_value, modified_time_inmillis, author, abstract')
                                .filter('title', 'ilike', '%' + query + '%')
                                .order('no', { ascending: false })
                                .range(page * 5 - 5, page * 5 - 1)
                                .then(({ data, error }) => {
                                    if (error) {
                                        onFailed(error.message)
                                        return
                                    }

                                    onSuccess(
                                        data.map(row => {
                                            let isOwned = false
                                            if (ownedArticleId.includes(String(row.article_id))) {
                                                isOwned = true
                                            }

                                            return {
                                                article_id: String(row.article_id),
                                                image: String(row.image),
                                                title: String(row.title),
                                                article_value: String(row.article_value),
                                                modified_time_inmillis: parseInt(String(row.modified_time_inmillis)),
                                                author: String(row.author),
                                                total_page: totalPage,
                                                abstract: String(row.abstract),
                                                owned: isOwned
                                            }
                                        })
                                    )
                                })
                        })
                }
            })
    }

    getArticleById = (
        email: string,
        id: string,
        onSuccess: (data: { article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; abstract: string; date: string; owned: boolean }) => void,
        onFailed: (message: string) => void
    ) => {
        let totalPage = 0
        let ownedArticleId: string[] = []

        this.supabase
            .from('user')
            .select('uid')
            .eq('email', email)
            .then(({ data, error }) => {
                if (data !== null) {
                    this.supabase
                        .from('user_article')
                        .select('uid, article_id')
                        .eq('uid', data[0].uid)
                        .then(({ data, error }) => {
                            if (error) {
                                onFailed(error.message)
                                return
                            }

                            ownedArticleId = data.map(row => {
                                return String(row.article_id)
                            })

                            this.supabase
                                .from('article')
                                .select('no, article_id, image, title, article_value, modified_time_inmillis, author, abstract')
                                .eq('article_id', id)
                                .then(({ data, error }) => {
                                    if (error) {
                                        onFailed(error.message)
                                        return
                                    }

                                    if (data.length == 0) {
                                        onFailed('Article not found')
                                        return
                                    }

                                    onSuccess(
                                        data.map(row => {
                                            const date = new Date()
                                            date.setTime(row.modified_time_inmillis)

                                            return {
                                                article_id: String(row.article_id),
                                                image: String(row.image),
                                                title: String(row.title),
                                                article_value: String(row.article_value),
                                                modified_time_inmillis: parseInt(String(row.modified_time_inmillis)),
                                                author: String(row.author),
                                                abstract: String(row.abstract),
                                                date: String(date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes()),
                                                owned: ownedArticleId.includes(row.article_id)
                                            }
                                        })[0]
                                    )
                                })
                        })
                }
            })
    }

    addArticleToCart = (email: string, id: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        //get uid
        this.supabase
            .from('user')
            .select('uid')
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    onFailed(error.message)
                }

                if (data !== null) {
                    const uid = data.map(row => { return String(row.uid) })[0]

                    //cek balance
                    this.supabase
                        .from('user')
                        .select('coin')
                        .eq('uid', uid)
                        .then(({ data, error }) => {
                            if (error) {
                                onFailed(error.message)
                                return
                            }

                            if (data !== null) {
                                const coin = data.map(row => { return parseInt(String(row.coin)) })[0]

                                //get article info
                                this.supabase
                                    .from('article')
                                    .select('modified_time_inmillis')
                                    .eq('article_id', id)
                                    .then(({ data, error }) => {
                                        if (error) {
                                            onFailed(error.message)
                                            return
                                        }

                                        if (data !== null) {
                                            const articlePrice = getArticlePrice(Date.now(), data.map(row => { return parseInt(String(row.modified_time_inmillis)) })[0])
                                            if (coin < articlePrice) {
                                                onFailed('You don\'t have enough coin. Try to look at another article')
                                                return
                                            }

                                            this.supabase
                                                .from('user_article')
                                                .insert(
                                                    {
                                                        uid: uid,
                                                        article_id: id
                                                    }
                                                )
                                                .then(({ data, error }) => {
                                                    if (error) {
                                                        onFailed(error.message)
                                                        return
                                                    }

                                                    this.supabase
                                                        .from('coin_50000_track')
                                                        .select('uid, recent_coin_track, ticket')
                                                        .eq('uid', uid)
                                                        .then(({ data, error }) => {
                                                            if (error) {
                                                                onFailed(error.message)
                                                                return
                                                            }

                                                            if (data !== null) {
                                                                if (parseInt(String(data[0].recent_coin_track)) + articlePrice >= 50000) {
                                                                    this.supabase
                                                                        .from('coin_50000_track')
                                                                        .update({
                                                                            uid: uid,
                                                                            recent_coin_track: (parseInt(String(data[0].recent_coin_track)) + articlePrice - 50000),
                                                                            ticket: (parseInt(String(data[0].ticket)) + 1)
                                                                        })
                                                                        .eq('uid', uid)
                                                                        .then(({ data, error }) => {
                                                                            if (error) {
                                                                                onFailed(error.message)
                                                                                return
                                                                            }

                                                                            this.supabase
                                                                                .from('user')
                                                                                .update({
                                                                                    coin: (coin - articlePrice)
                                                                                })
                                                                                .eq('uid', uid)
                                                                                .then(({ data, error }) => {
                                                                                    if (error) {
                                                                                        onFailed(error.message)
                                                                                        return
                                                                                    }

                                                                                    onSuccess()
                                                                                })
                                                                        })
                                                                } else {
                                                                    this.supabase
                                                                        .from('coin_50000_track')
                                                                        .update({
                                                                            uid: uid,
                                                                            recent_coin_track: (parseInt(String(data[0].recent_coin_track)) + articlePrice),
                                                                            ticket: (parseInt(String(data[0].ticket)))
                                                                        })
                                                                        .eq('uid', uid)
                                                                        .then(({ data, error }) => {
                                                                            if (error) {
                                                                                onFailed(error.message)
                                                                                return
                                                                            }

                                                                            this.supabase
                                                                                .from('user')
                                                                                .update({
                                                                                    coin: (coin - articlePrice)
                                                                                })
                                                                                .eq('uid', uid)
                                                                                .then(({ data, error }) => {
                                                                                    if (error) {
                                                                                        onFailed(error.message)
                                                                                        return
                                                                                    }

                                                                                    onSuccess()
                                                                                })
                                                                        })
                                                                }
                                                            }
                                                        })
                                                })
                                        }

                                    })
                            }
                        })
                }
            })
    }

    getOwnedArticle = (
        email: string,
        onSuccess: (
            data: Array<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; abstract: string; owned: boolean }>
        ) => void,
        onFailed: (message: string) => void
    ) => {
        let ownedArticleId: string[] = []

        this.supabase
            .from('user')
            .select('uid')
            .eq('email', email)
            .then(({ data, error }) => {
                if (data !== null) {
                    this.supabase
                        .from('user_article')
                        .select('uid, article_id')
                        .eq('uid', data[0].uid)
                        .then(({ data, error }) => {
                            if (error) {
                                onFailed(error.message)
                                return
                            }

                            ownedArticleId = data.map(row => {
                                return String(row.article_id)
                            })

                            this.supabase
                                .from('article')
                                .select('no, article_id, image, title, article_value, modified_time_inmillis, author, abstract')
                                .in('article_id', ownedArticleId)
                                .then(({ data, error }) => {
                                    if (error) {
                                        onFailed(error.message)
                                        return
                                    }

                                    onSuccess(
                                        data.map(row => {
                                            let isOwned = false
                                            if (ownedArticleId.includes(String(row.article_id))) {
                                                isOwned = true
                                            }

                                            return {
                                                article_id: String(row.article_id),
                                                image: String(row.image),
                                                title: String(row.title),
                                                article_value: String(row.article_value),
                                                modified_time_inmillis: parseInt(String(row.modified_time_inmillis)),
                                                author: String(row.author),
                                                abstract: String(row.abstract),
                                                owned: isOwned
                                            }
                                        }).filter(data => data.owned)
                                    )
                                })
                        })
                }
            })

    }

    getLuckyDrawInfo = (
        email: string,
        onSuccess: (data: { uid: string, recent_coin_track: number, ticket: number }) => void,
        onFailed: (errorMessage:string) => void
    ) => {
        this.supabase
            .from('user')
            .select('uid')
            .eq('email', email)
            .then(({ data, error }) => {
                if (error) {
                    onFailed(error.message)
                    return
                }

                if (data !== null) {
                    const uid = String(data[0].uid)

                    this.supabase
                    .from('coin_50000_track')
                    .select('uid, recent_coin_track, ticket')
                    .eq('uid', uid)
                    .then(({data, error}) => {
                        if(error){
                            onFailed(error.message)
                            return
                        }

                        if(data!== null){
                            onSuccess(
                                {
                                    uid:data[0].uid,
                                    recent_coin_track:data[0].recent_coin_track,
                                    ticket:data[0].ticket
                                }
                            )
                        }
                    })
                }
            })
    }
}