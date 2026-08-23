import { useState } from "react";

const Header = () => {
	return <h1>Give us your feedback</h1>;
};

const Button = ({ text, onClick }) => {
	return (
		<button onClick={onClick} style={{ marginRight: "1rem" }}>
			{text}
		</button>
	);
};

const Statistics = ({ text, number }) => {
	// prettier-ignore
	return <li>{text}: {number}</li>
};

const Footer = ({ feedbacks }) => {
	return (
		<>
			<h2>Statistics</h2>
			<ul>
				<Statistics text="Good" number={feedbacks.good} />
				<Statistics text="Neutral" number={feedbacks.neutral} />
				<Statistics text="Bad" number={feedbacks.bad} />
			</ul>
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGood = () => setGood(good + 1);
	const handleNeutral = () => setNeutral(neutral + 1);
	const handleBad = () => setBad(bad + 1);

	const feedbacks = {
		good: good,
		neutral: neutral,
		bad: bad
	};

	return (
		<div>
			<Header />
			<div>
				<Button text="Good" onClick={handleGood} />
				<Button text="Neutral" onClick={handleNeutral} />
				<Button text="Bad" onClick={handleBad} />
			</div>
			<Footer feedbacks={feedbacks} />
		</div>
	);
};

export default App;
