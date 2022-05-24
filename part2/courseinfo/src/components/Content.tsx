import React from 'react';
import Part from './Part'
import {Part as PartType} from "../types";


interface ContentProps {
    parts: PartType[]
}

export default function Content({parts}: ContentProps) {
    return (
        <>
            {parts.map(part => <Part part={part}/>)}
        </>
    )
}
