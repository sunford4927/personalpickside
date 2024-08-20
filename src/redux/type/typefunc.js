import * as types from './types'

export const login =(userData) => ({
    type : types.LOGIN,
    data : userData
})

export const logout =() => ({
    type : types.LOGOUT,
    data : 'logout'
})