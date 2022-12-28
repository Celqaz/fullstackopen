import React from 'react';
import {useAppSelector} from "../app/hooks";

export default function Notification() {
    const notification = useAppSelector(state => state.notification)

    return (
        <div className={'notification'}>
            {notification}
        </div>
    )
}
