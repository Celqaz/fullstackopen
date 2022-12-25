import React from 'react';
import {useAppSelector} from "../hooks";

export default function Notification (){
    const notification = useAppSelector(state => state.notification)
    return (
        <div className={'Notification'}>
            {notification.content}
        </div>
    )
}
