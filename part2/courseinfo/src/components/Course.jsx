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

export default Course