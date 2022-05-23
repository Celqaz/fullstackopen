import React from 'react';

export default function Part ({partInfo}){
    return (
        <div>{partInfo.name} {partInfo.exercises}</div>
    )
}
