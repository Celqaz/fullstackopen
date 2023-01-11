import React, {useEffect, useState} from 'react';
import {UserInfo, UserType} from "../types";
import usersService from "../services/usersService";
import {Link} from "react-router-dom";

export default function Users(): JSX.Element {
    const [userInfo, setUserInfo] = useState<UserInfo[]>([])
    useEffect(() => {
        usersService.getAllUser()
            .then(data => {
                const getUserInfo: UserInfo[] = []
                data.map((user: UserType) => getUserInfo.push({
                    id:user.id,
                        username: user.username,
                        blogsCreated: user.blogs.length
                    })
                )
                setUserInfo(getUserInfo)
            })
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Blog Created</th>
                </tr>
                </thead>
                <tbody>
                {userInfo.map(user => {
                    return (
                        <tr key={user.username}>
                            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td>{user.blogsCreated}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
