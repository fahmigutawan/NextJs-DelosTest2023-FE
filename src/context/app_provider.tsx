import { Repository } from "@/data/repository/repository";
import { ApiSource } from "@/data/source/api_source";
import { LocalStorageSource } from "@/data/source/localstorage_source";
import { useRouter } from "next/router";
import React from "react";
import { AppContext } from "./app_context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    //sources
    const apiSource = new ApiSource()
    const localStorageSource = new LocalStorageSource()

    //repository
    const repository = new Repository(apiSource, localStorageSource)

    return (
        <AppContext.Provider value={{ repository: repository }}>
            {children}
        </AppContext.Provider>
    )
}