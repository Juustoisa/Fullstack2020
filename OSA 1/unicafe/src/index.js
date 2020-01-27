import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistics = (props) => {
    if (props.allReviews.length === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    } else {
        return (
            <table>
                <tbody>
                    <StatisticLine text='Good' value={props.good} />
                    <StatisticLine text='Neutral' value={props.neutral} />
                    <StatisticLine text='Bad' value={props.bad} />
                    <StatisticLine text='Total' value={props.total} />
                    <StatisticLine text='Average' value={props.averageReview} />
                    <StatisticLine text='Positive reviews' value={(props.good / props.total) * 100 + '%'} />
                </tbody>
            </table>
        )
    }
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>
            
                {props.text + ': '}
            </td>
            <td>{props.value}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allReviews, setAllReviews] = useState([])
    const total = allReviews.length
    const averageReview = allReviews.reduce((sum, el) => sum + el, 0) / allReviews.length

    const handleGoodClick = () => {
        setGood(good + 1)
        setAllReviews(allReviews.concat(1))

    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAllReviews(allReviews.concat(0))
    }

    const handleBadClick = () => {
        setBad(bad + 1)
        setAllReviews(allReviews.concat(-1))
    }

    return (
        <div>
            <h2>Give feedback</h2>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <h2>statistics</h2>
            <Statistics averageReview={averageReview} total={total} allReviews={allReviews} good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)