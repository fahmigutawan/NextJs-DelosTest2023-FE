export const getArticlePrice = (now:number, articleTime:number) => {
    const sevenDaysMillis = 604_800_000
    const oneDayMillis = 86_400_000

    if((now - articleTime) <= oneDayMillis){
        return 50_000
    }else if((now - articleTime) <= sevenDaysMillis){
        return 20_000
    }else{
        return 0
    }
}