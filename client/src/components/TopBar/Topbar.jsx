import "./topbar.css"
import { Link } from "react-router-dom"
//icnos
import {
    AiOutlineSearch,
    FaFacebook,
} from "../../utils/icons"

import { links, topbarRight } from "./data"



export default function TopBar({ activePage }) {

    return (
        <header className="topbar-header">
            <div className="topbar-container container-1">
                {/* top bar left */}
                <div className="topbar-left">
                    <FaFacebook className="topbar-left-logo" />
                    <div className="topbar-left-search">
                        <label htmlFor="topbar-left-search-input" className="topbar-left-search-label">
                            <AiOutlineSearch className="topbar-left-search-logo" />
                        </label>
                        <input type="text" placeholder="search facebook" id="topbar-left-search-input" />
                    </div>
                </div>
                {/* topbar center */}
                <div className="topbar-center">
                    <ul className="topbar-center-list">
                        {
                            links.map((item) => {
                                return (
                                    <Link key={item.id} to={item.link} className={activePage === item.text ? 'active-link' : ""}>
                                        <li>
                                            <item.Icon className={`topbar-center-list-logo ${activePage === item.text ? "activeTopbarPage" : ""}`} />
                                            <span className={activePage === item.text ? 'active-line' : ""}></span>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* topbar right */}
                <div className="topbar-right">
                    {
                        topbarRight.map((item) => {
                            return (
                                <div key={item.id}>
                                    <item.Icon />
                                </div>
                            )
                        })
                    }
                    <div className="topbar-right-profil">
                        <img src="./assets/person/1.jpeg" alt="" />
                    </div>
                </div>
            </div>
        </header>
    )
}
