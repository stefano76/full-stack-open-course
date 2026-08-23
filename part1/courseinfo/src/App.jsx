function Header({ course }) {
  return <h1>{course.title}</h1>;
}

function Content({ course }) {
  return (
    <>
      <p>
        {course.parts[0].title} {course.parts[0].exercises}
      </p>
      <p>
        {course.parts[1].title} {course.parts[1].exercises}
      </p>
      <p>
        {course.parts[2].title} {course.parts[2].exercises}
      </p>
    </>
  );
}

function Total({ course }) {
  return (
    <p>
      Number of exercises{" "}
      {course.parts[0].exercises +
        course.parts[1].exercises +
        course.parts[2].exercises}
    </p>
  );
}

const App = () => {
  const course = {
    title: "Half Stack application development",
    parts: [
      { title: "Fundamentals of React", exercises: 10 },
      { title: "Using props to pass data", exercises: 7 },
      { title: "State of a component", exercises: 14 },
    ],
  };

  console.log(course.title);

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
