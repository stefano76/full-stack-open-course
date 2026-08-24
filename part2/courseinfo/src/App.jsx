const Part = ({course, part}) => {
    return (
        <p>
            {course.parts[part].name} {course.parts[part].exercises}
        </p>
    );
};

const Header = ({course}) => {
    return <h1>{course.name}</h1>;
};

const Content = ({course}) => {
    return (
        <>
            {course.parts.map((part, i) => (
                <Part key={part.id} course={course} part={i} />
            ))}
        </>
    );
};

const Total = ({course}) => {
    const total = course.parts.reduce((acc, cur) => acc + cur.exercises, 0)

    return (
        <p style={{fontWeight: 'bold'}}>Total of {total} exercises</p>
    );
};

const Course = ({course}) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return <Course course={course} />
}

export default App