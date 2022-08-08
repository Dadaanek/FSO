const Header = (props) => {
    return (
            <div>
                <h1>{props.course}</h1>
            </div>
        )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercise}</p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
            <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
            <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    return (
        <div>
            <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [{
            name: 'Fundamentals of React',
            exercises: 10,
        },
            {
                name: 'Using props to pass data',
                exercises: 7,

            },
            {
                name: 'State of a component',
                exercises: 14,
            }]
    }
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            {/*<Content part1={part1.name} ex1={part1.exercises} part2={part2.name} ex2={part2.exercises} part3={part3.name} ex3={part3.exercises}/>*/}
            {/*<Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />*/}
            {/*<p>Number of exercises {exercises1 + exercises2 + exercises3}</p>*/}
        </div>
    )
}

export default App
