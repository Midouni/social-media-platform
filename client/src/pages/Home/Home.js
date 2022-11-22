import React from 'react'
import { TopBar, SidebarLeft, Feed, SidebarRight, CreatePost } from "../../components"
import { useHomeGlobalContext } from '../../context'
import "./home.css"


export default function Home() {
    const { showCreatePostComponent } = useHomeGlobalContext()
    if (showCreatePostComponent) {
        document.body.style.overflow = "hidden"
        document.body.style.marginRight = "15px"
    } else {
        document.body.style.overflow = "scroll"
        document.body.style.marginRight = "0px"
    }
    return (
        <>
            {showCreatePostComponent && <CreatePost />}
            <TopBar activePage={"Home"} />
            <div className="home-container">
                <SidebarLeft />
                <Feed />
                <SidebarRight />
            </div>
        </>

    )
}

