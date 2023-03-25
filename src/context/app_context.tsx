import { Repository } from "@/data/repository/repository";
import { ApiSource } from "@/data/source/api/api_source";
import { LocalStorageSource } from "@/data/source/localstorage/localstorage_source";
import { SupabaseSource } from "@/data/source/supabase/supabase_source";
import { createContext } from "react";
import { AppContextType } from "./app_context_type";

export const AppContext = createContext<AppContextType>({ repository: new Repository(new ApiSource(), new LocalStorageSource(), new SupabaseSource()) });