const reducer = (state, action) => {
    if (action.type === "SHOW_CREATE_POST") {
        return { ...state, showCreatePostComponent: true }
    }
    if (action.type === "HIDE_CREATE_POST") {
        return { ...state, showCreatePostComponent: false }
    }

    throw new Error('no matching action type')
}

export default reducer