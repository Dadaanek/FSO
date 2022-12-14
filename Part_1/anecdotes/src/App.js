import { useState } from 'react'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Anecdote = ({text}) => {
    return (
        <div>
            {text}
        </div>
    )
}

const AnecdoteMost = ({points, anecdotes}) => {
    const max = Math.max(...points)
    const index = points.indexOf(Math.max(...points))
    if (max > 0) {
        return (
            <div>
                <h1>Anecdote with most votes</h1>
                <p>{anecdotes[index]}</p>
                <p>has {max} votes</p>
            </div>
        )
    }
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
    const [selected, setSelected] = useState(undefined)

    const handleClickAnecdote = () => {
        const randomNumber = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomNumber)

    }

    const handleClickVote = () => {
        const copyArr = [...points]
        copyArr[selected] += 1
        setPoints(copyArr)
        console.log(points)
    }
    return (
        <div>
            <Button handleClick={handleClickAnecdote} text="new anecdote"/>
            <Button handleClick={handleClickVote} text="vote" />
            <Anecdote text={anecdotes[selected]} />
            <p>{selected ? `has ${points[selected]} points` : ''}</p>
            <AnecdoteMost points={points} anecdotes={anecdotes} />
        </div>
    )
}

export default App