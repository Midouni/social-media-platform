import {
    AiFillHome,
    FaUserFriends,
    MdGroups,
    BsFillCalendarDayFill,
    CgMenuGridO,
    FaFacebookMessenger,
    MdNotificationsActive
} from "../../utils/icons"

export const links = [
    {
        id: 1,
        link: '/',
        text: "Home",
        Icon: AiFillHome
    },
    {
        id: 2,
        link: '/friends',
        text: "Friends",
        Icon: FaUserFriends
    },
    {
        id: 3,
        link: '/groups',
        text: "Groups",
        Icon: MdGroups
    },
    {
        id: 4,
        link: '/events',
        text: "Events",
        Icon: BsFillCalendarDayFill
    },
]

export const topbarRight = [
    {
        id: 1,
        text: "Menu",
        Icon: CgMenuGridO
    },
    {
        id: 2,
        text: "Message",
        Icon: FaFacebookMessenger
    },
    {
        id: 3,
        text: "Notification",
        Icon: MdNotificationsActive
    },
]
