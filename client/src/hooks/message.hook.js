// import { text } from 'express'
import {useCallback} from 'react'

export const useMessage = () => {
    // so that the react will not go into the cyclic recursion, we wrap it in useCallback
    return useCallback(text => {
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, []) 

}
