import React from 'react';
import {Part} from "../types";

interface TotalProps{
    parts: Part[]
}

export default function Total({parts}:TotalProps) {
    return (
        <div>
            <b>
                total of&nbsp;
                {parts.reduce((sum, part) => {
                    return sum + part.exercises
                }, 0)}
                &nbsp;exercises
            </b>
        </div>
    )
}
