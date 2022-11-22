export const reducer = (state, action) => {
    if (action.type === 'SHOW_LINKS') {
        return { ...state, showLinks: !state.showLinks }
    }
}