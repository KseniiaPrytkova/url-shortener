import React, {useEffect, useState, useContext, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'

export const DetailPage = () => {
    // to get the token 
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    // key id we are taking from router.js; we did name it id
    // so linkId is am id of our link
    const linkId = useParams().id

    // method to load the link 
    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, `GET`, null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {}
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && link && <LinkCard link={link}/> }
        </>
    )
}
