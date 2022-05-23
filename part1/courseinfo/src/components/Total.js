import React from 'react';

export default function Total({parts}) {
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
