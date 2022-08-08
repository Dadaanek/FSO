import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    const average = Math.round(((good + -1 * bad) / all) * 10) / 10;
    const positive = `${Math.round((good / all) * 1000) / 10}%`;
    if (all > 0) {
        return (
          <table>
              <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={all} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={positive} />
              </tbody>
          </table>
        )
    } else {
        return (
            <p>No feedback given.</p>
        )
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
        <h1>statistics</h1>
        {/*<Statistics text="good" variableState={good} />*/}
        {/*<Statistics text="neutral" variableState={neutral} />*/}
        {/*<Statistics text="bad" variableState={bad} />*/}
        {/*<Statistics text="all" variableState={all} />*/}
        {/*<Statistics text="average" variableState={average} />*/}
        {/*<Statistics text="positive" variableState={`${positive * 100}%`} />*/}
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
  )
}

export default App