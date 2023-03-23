import { Repository } from "@/data/repository/repository";
import { createContext } from "react";
import { AppContextType } from "./app_context_type";

export const AppContext = createContext<AppContextType>({ repository:new Repository() });