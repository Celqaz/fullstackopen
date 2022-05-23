import React from 'react';
import Part from "./Part";

export default function Content({parts}) {
    return (
        <>
            <Part partInfo={parts[0]}/>
            <Part partInfo={parts[1]}/>
            <Part partInfo={parts[2]}/>
        </>
    )
}
