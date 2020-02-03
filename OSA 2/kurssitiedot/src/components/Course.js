import React from 'react'

const Course = ({ name, parts }) => {

    return (
        <div>
            <Header courseName={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}


const Header = ({ courseName }) => {
    return (
        <>
            <div>
                <h2>{courseName}</h2>
            </div>
        </>
    )
}

const Content = ({ parts }) => {

    return (
        <>
            <div>
                {parts.map((value) =>
                    <Part key={value.id} partName={value.name} exercises={value.exercises} />
                )}
            </div>
        </>
    )
}

const Part = ({ partName, exercises }) => {
    return (
        <>
            <div>
                <p>{partName} {exercises}</p>
            </div>
        </>
    )
}

const Total = ({ parts }) => {
    return (
        <>
            <div>
                <b>Total of {parts.reduce((summa, arvo) => summa + arvo.exercises, 0)} exercises</b>
            </div>
        </>
    )
}

export default Course