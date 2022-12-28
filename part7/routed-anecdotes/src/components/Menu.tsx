import React from 'react';

export default function Menu (){
    const padding = {
        paddingRight: 5
    }
    return (
        <div className={'menu'}>
            <a href='/' style={padding}>anecdotes</a>
            <a href='/create' style={padding}>create new</a>
            <a href='/about' style={padding}>about</a>
        </div>
    )
}
