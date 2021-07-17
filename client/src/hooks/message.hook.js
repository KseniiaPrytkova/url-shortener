// import { text } from 'express'
import {useCallback} from 'react'

export const useMessage = () => {
    // чтоб реакт не входил в цикличную рекурсию заворачиваем в useCallback
    return useCallback(text => {
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, []) 

}
