import React, { useReducer, useContext } from "react";
import reducer from "./reducer";

const HomeContext = React.createContext()
const initialState = {
    showCreatePostComponent: false
}

const HomeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const showCreatePostComponentHandler = () => {
        dispatch({ type: "SHOW_CREATE_POST" })
    }
    const hideCreatePostComponentHandler = () => {
        dispatch({ type: "HIDE_CREATE_POST" })
    }
    return (
        <HomeContext.Provider value={{
            ...state,
            showCreatePostComponentHandler,
            hideCreatePostComponentHandler
        }} >
            {children}
        </HomeContext.Provider>
    );
}

const useHomeGlobalContext = () => {
    return useContext(HomeContext)
}


export { useHomeGlobalContext, HomeContext, HomeProvider }