import React from 'react';

interface NotificationProps {
    message: string
}

const Notification = ({message}: NotificationProps): JSX.Element | null=> {

    /**
     * if errorMessage is null, render nothing.
     */
    if (!message){
        return null
    }

    /**
     * render error message with style
     */
    return (
        <div className={'message'}>
            {message}
        </div>
    );
};

export default Notification;
