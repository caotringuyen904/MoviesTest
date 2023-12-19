
// contain all state global of user
const initialState = {
    user: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log("132132141")
            console.log(action);
            return action.payload
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export default userReducer