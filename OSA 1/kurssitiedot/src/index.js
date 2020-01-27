import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
    return (
        <>
            <div>
                <h1>{props.courseName}</h1>
            </div>
        </>
    )
  }

const Content = (props) => {
    return (
        <>  
            {props.parts.map((value) => {
              return <Part partName={value.name} exercises={value.exercises}/>
            })}   
        </>
    )
  }

  const Part = (props) => {
    return (
        <>
            <div>
                <p>{props.partName} {props.exercises}</p>
            </div>
        </>
    )
  }

  const Total = (props) => {
    return ( 
        <>  
            <div>
                <p>Number of exercises {props.parts.reduce((summa, arvo) => summa + arvo.exercises, 0)}</p>
            </div>
        </>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))