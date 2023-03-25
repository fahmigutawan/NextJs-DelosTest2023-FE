import { Repository } from "@/data/repository/repository";
import { ApiSource } from "@/data/source/api/api_source";
import { LocalStorageSource } from "@/data/source/localstorage/localstorage_source";
import { SupabaseSource } from "@/data/source/supabase/supabase_source";
import { useRouter } from "next/router";
import React from "react";
import { AppContext } from "./app_context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    //sources
    const apiSource = new ApiSource()
    const localStorageSource = new LocalStorageSource()
    const supabaseSource = new SupabaseSource()

    //repository
    const repository = new Repository(apiSource, localStorageSource, supabaseSource)

    return (
        <AppContext.Provider value={{ repository: repository }}>
            {children}
        </AppContext.Provider>
    )
}