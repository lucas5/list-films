import { createStore } from 'redux';

const INITIAL_STATE = {
    userLogged: {
        id: '',
        username: '',
        password: '',
        email: '',
    }
}

export default function dataUser(state = INITIAL_STATE, action) {
    if (action.type === 'USER_LOGIN') {
        return {
            ...state,
            userLogged: action.userLogged
        }
    }
    return state;
}