import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import usersService from "../services/usersService";
import {UserType} from "../types";

export default function User() {
    const {id} = useParams();
    const [userInfo, setUserInfo] = useState<UserType>()

    useEffect(() => {
        if (id) {
            usersService.getUserByID(id)
                .then(data => setUserInfo(data))
        }
    }, [id])

    if (!userInfo){
        return <div></div>
    }

    return (
        <div className={'mt-20 mb-8'}>
            <h1> {userInfo.username}</h1>
            <h2 className={'my-2'}> Added blogs:</h2>
            <ul className={'list-disc list-inside my-2'}>
                {userInfo.blogs.map( blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    )
}
