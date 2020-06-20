export function loginUser(user) {
    return {
        type: 'USER_LOGIN',
        userLogged: user
    }
}
