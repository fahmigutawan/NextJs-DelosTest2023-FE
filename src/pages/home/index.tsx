import { AppContext } from "@/context/app_context";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
    const appContext = useContext(AppContext);
    const router = useRouter()

    useEffect(
        () => {
            if (appContext.repository.getToken() == '') {
                router.push('/login')
            }
        }, [])

    return (
        <div>
            <p>INI ADALAH HOME</p>
        </div>
    )
}