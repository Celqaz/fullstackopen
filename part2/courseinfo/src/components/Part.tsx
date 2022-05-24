import React from 'react';
import {Part as PartType} from "../types";

interface PartProps{
    part : PartType
}


export default function Part ({part}:PartProps){
    return (
        <div>{part.name} {part.exercises}</div>
    )
}
