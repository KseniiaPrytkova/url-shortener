import {createContext} from 'react'

// empty fn that do nothing
function noop() {}

// this is a context that can precede parameters not by a tree structure but by using an application context 
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})