import React from 'react'
import Total from "./Total";
import Header from "./Header";
import Content from "./Content";

const Course = ({course}) => {
    return (
        <div>
            <Header header={course.name}/>
            {course.parts.map(part => <Content key={part.id} part={part}/>)}
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course
