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
    return (
        <p>
            Number of exercises{" "}
            {course.parts[0].exercises +
                course.parts[1].exercises +
                course.parts[2].exercises}
        </p>
    );
};

const Course = ({course}) => {
    return (
        <>
            <Header course={course}/>
            <Content course={course}/>
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
            }
        ]
    }

    return <Course course={course} />
}

export default App