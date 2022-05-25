import React from 'react';
import {Message} from "../types";

interface NotificationProps {
    message: Message
}

const Notification = ({message}: NotificationProps): JSX.Element | null=> {

    /**
     * if errorMessage is null, render nothing.
     */
    if (!message.message){
        return null
    }

    /**
     * render error message with style
     */
    return (
        <div className={`message ${message.type}`}>
            {message.message}
        </div>
    );
};

export default Notification;
