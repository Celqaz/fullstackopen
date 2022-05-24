import React from 'react';

interface HeaderProps {
    header:string
}


export default function Header ({header}:HeaderProps){
    return (
        <h1>{header}</h1>
    )
}
