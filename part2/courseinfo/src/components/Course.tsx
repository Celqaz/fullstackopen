import React from 'react'
import Header from "./Header";
// types
import {Courses} from "../types";
import Total from "./Total";
import Content from "./Content";

interface CourseProps {
    courses: Courses[]
}


const Course = ({courses}: CourseProps) => {
    return (

        <div>
            {courses.map(
                (course) => {
                    return (
                        <>
                            <Header header={course.name}/>
                            {/*{course.parts.map(part => <Content key={part.id} part={part}/>)}*/}
                             <Content parts={course.parts}/>
                            <Total parts={course.parts}/>
                        </>
                    )
                }
            )}
        </div>
    )
}

export default Course
