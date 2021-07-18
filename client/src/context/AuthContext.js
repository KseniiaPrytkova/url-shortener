import {createContext} from 'react'

// empty fn that do nothing
function noop() {}

// это контекст кот сможет перед параметры не по древовидной структуре а спомощью контекста по приложению 
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})