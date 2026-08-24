const Part = ({course, part}) => {
    return (
        <p>
            {course.parts[part].name} {course.parts[part].exercises}
        </p>
    );
};

const Header = ({course}) => {
    return <h2>{course.name}</h2>;
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
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Web development curriculum</h1>

            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    )
}

export default App