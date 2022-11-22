import React from 'react'
import "./share.css"
import { Link } from "react-router-dom"
import { TiVideo } from "react-icons/ti"
import { MdOutlinePhotoLibrary } from "react-icons/md"
import { BiSmile } from "react-icons/bi"
import { useHomeGlobalContext } from "../../context/homePage/context"

export default function Share() {
    const { showCreatePostComponentHandler } = useHomeGlobalContext()
    return (
        <section className='share-section'>
            <div className="share-section-top">
                <div className="share-section-profil">
                    <Link >
                        <img src="./assets/person/1.jpeg" alt="" />
                    </Link>
                </div>
                <div className="share-section-input">
                    <form className='share-input' >
                        <input onClick={showCreatePostComponentHandler} placeholder={`what's in your mind, {Mohamed}?`} type="text" />
                    </form>
                </div>
            </div>
            <div className="share-section-bottom">
                <button className='share-section-bottom__btn'>
                    <TiVideo className='share-section-bottom__live-icon'></TiVideo>
                    <span>live video</span>
                </button>
                <button className='share-section-bottom__btn'>
                    <MdOutlinePhotoLibrary className='share-section-bottom__photo-icon'></MdOutlinePhotoLibrary>
                    <span>photo/video</span>
                </button>
                <button className='share-section-bottom__btn'>
                    <BiSmile className='share-section-bottom__feeling-icon'></BiSmile>
                    <span>feeling/activity</span>
                </button>

            </div>

        </section>
    )
}
