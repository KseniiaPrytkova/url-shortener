import React from 'react'
import { Link } from 'react-router-dom'

export const LinksLinks = ({ links }) => {
    if (!links.length) {
        return <p className="center">No links yet</p>
    }
    return (
        <table class="responsive-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Original</th>
                    <th>Abbreviated</th>
                    <th>Open</th>
                </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from.slice(0, 8) + '...'}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>

                    </tr>
                )
            }) }
            </tbody>
      </table>
    )
}