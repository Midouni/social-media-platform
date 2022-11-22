
import "./createPost.css"
import { MdOutlineClose, MdPhotoLibrary, MdPlace } from "react-icons/md"
import { FaUserTag, FaFlag } from "react-icons/fa"
import { BiSmile } from "react-icons/bi"
import { useHomeGlobalContext } from "../../context"
import { useRef, useEffect } from "react"




export default function CreatePost() {
    const { hideCreatePostComponentHandler } = useHomeGlobalContext()
    const textareaRef = useRef(null)
    const contentRef = useRef(null)


    const dynamicHeightHandler = () => {
        textareaRef.current.style.height = `auto`
        let scHeight = textareaRef.current.scrollHeight
        if (scHeight < 150) {
            textareaRef.current.style.height = '150px'
        } else if (scHeight + 240 < window.innerHeight - 100) {
            textareaRef.current.style.height = `${scHeight}px`
        } else {
            textareaRef.current.style.height = `${window.innerHeight - 340}px`
        }
        if (textareaRef.current.value !== '') {
            document.querySelector('.createPostComponent__btn').style.backgroundColor = '#196DD9'
            document.querySelector('.createPostComponent__btn').style.color = 'white'
        } else {
            document.querySelector('.createPostComponent__btn').style.backgroundColor = '#D7DADE'
            document.querySelector('.createPostComponent__btn').style.color = '#BCC0C4'
        }
    }
    useEffect(() => {
        textareaRef.current.style.height = '150px'
        textareaRef.current.focus()
    }, [])

    return (
        <section className={`createPostComponent`} >
            <div className="createPostComponent__container" >
                <div className="createPostComponent__content" ref={contentRef}>
                    <div className="closeCreatePostComponenet" onClick={hideCreatePostComponentHandler}>
                        <MdOutlineClose />
                    </div>
                    <div className="createPostComponent__title">
                        <h4>create post</h4>
                    </div>
                    <div className="createPostComponent__user">
                        <img className="createPostComponent_pic" src="./assets/person/1.jpeg" alt="" />
                        <div className="createPostComponent__name">
                            <h4>mohamed midouni</h4>
                            <button>friends</button>
                        </div>
                    </div>
                    <textarea onChange={dynamicHeightHandler} ref={textareaRef} placeholder={`what's in your mind, {Mohamed}?`} name="" id="createPostComponent_textarea"></textarea>
                    <div className="createPostComponent__menu">
                        <span>add your post </span>
                        <div className="createPostComponent__menu__btns">
                            <span><MdPhotoLibrary color="#41B45E" /></span>
                            <span><FaUserTag color="#1870E5" /> </span>
                            <span><BiSmile color="gold" /></span>
                            <span><MdPlace color="#E84F3A" /></span>
                            <span><FaFlag color="#35A6CA" /></span>
                        </div>
                    </div>
                    <button className="createPostComponent__btn">post</button>
                </div>
            </div>
        </section >
    )
}

