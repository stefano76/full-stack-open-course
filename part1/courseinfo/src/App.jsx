const Part = ({ course, part }) => {
  return (
    <p>
      {course.parts[part].title} {course.parts[part].exercises}
    </p>
  );
};

const Header = ({ course }) => {
  return <h1>{course.title}</h1>;
};

const Content = ({ course }) => {
  return (
    <>
      <Part course={course} part={0} />
      <Part course={course} part={1} />
      <Part course={course} part={2} />
    </>
  );
};

const Total = ({ course }) => {
  return (
    <p>
      Number of exercises{" "}
      {course.parts[0].exercises +
        course.parts[1].exercises +
        course.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    title: "Half Stack application development",
    parts: [
      { title: "Fundamentals of React", exercises: 10 },
      { title: "Using props to pass data", exercises: 7 },
      { title: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
