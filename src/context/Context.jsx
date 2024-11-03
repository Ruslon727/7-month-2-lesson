import { useState } from "react";
import { createContext } from "react";

export const Context = createContext()

export const LangContext = ({children}) => {
    const [lang, setLang] = useState("uz");
    return <Context.Provider value={{lang, setLang}}>{children}</Context.Provider>
}