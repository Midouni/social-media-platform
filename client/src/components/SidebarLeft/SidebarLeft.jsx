import "./sidebarleft.css"
import { links } from "./data"
import { Link } from "react-router-dom"
import SeeMore from "./seeMore/SeeMore"
import { useState } from "react"



export default function SidebarLeft() {
    const [showLinks, setShowLinks] = useState(false)
    return (
        <aside className="sidebar-left">
            <div className="sidebarContainer">
                <Link to='/profile'>
                    <div className="sidebar-user sidebar-item">
                        <img className="sidebar-user-picture" src="./assets/person/1.jpeg" alt="user profil" />
                        <span className="sidebar-user-name">mohamed midouni</span>
                    </div>
                </Link>
                <ul>
                    {
                        showLinks ?
                            links.map((item) => {
                                return (
                                    <Link key={item.id} to={item.link}>
                                        <li className="sidebar-item">
                                            <item.Icon className="sidebar-item-child" />
                                            <span>{item.text}</span>
                                        </li>
                                    </Link>
                                )
                            }) :
                            links.slice(0, 5).map((item) => {
                                return (
                                    <Link key={item.id} to={item.link}>
                                        <li className="sidebar-item">
                                            <item.Icon className="sidebar-item-child" />
                                            <span>{item.text}</span>
                                        </li>
                                    </Link>
                                )
                            })
                    }
                    {links.length > 5 && <SeeMore showLinks={showLinks} setShowLinks={setShowLinks} />}
                </ul>
            </div>
        </aside>
    )
}
