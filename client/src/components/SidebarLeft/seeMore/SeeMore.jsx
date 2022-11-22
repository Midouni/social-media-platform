import React from 'react'
// import PropTypes from 'prop-types';
import "./seeMore.css"
import { MdOutlineExpandMore, MdOutlineExpandLess } from "../../../utils/icons"

function SeeMore({ showLinks, setShowLinks }) {
    return (
        <li className='sidebar-item' onClick={() => setShowLinks(!showLinks)}>
            {showLinks ? <MdOutlineExpandLess className='sidebar-item-child seeMore-icon' /> : <MdOutlineExpandMore className='sidebar-item-child seeMore-icon' />}
            {showLinks ? <span>see less</span> : <span>see more</span>}
        </li>
    )
}

// SeeMore.propTypes = {
//     state: PropTypes.bool.isRequired
// }
// SeeMore.defaultProps = {
//     state: false
// }

export default SeeMore