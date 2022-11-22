import React, { useContext, useReducer } from "react";
import { reducer } from "./reducer"

const AppContext = React.createContext()
const initialState = {
    showLinks: false,
    showShurtcuts: false
}

const SidebarLeftProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const showAndHideLinks = () => {
        dispatch({ type: "SHOW_LINKS" })
    }


    return (
        <AppContext.Provider value={{
            ...state,
            showAndHideLinks
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { useGlobalContext, AppContext, SidebarLeftProvider }