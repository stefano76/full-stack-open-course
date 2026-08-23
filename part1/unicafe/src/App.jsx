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

const Feedbacks = ({ text, value }) => {
	// prettier-ignore
	return <li>{text}: {value}</li>
};

const Statitics = ({ feedbacks }) => {
	return (
		<ul>
			<Feedbacks text="Good" value={feedbacks.good} />
			<Feedbacks text="Neutral" value={feedbacks.neutral} />
			<Feedbacks text="Bad" value={feedbacks.bad} />
			<Total feedbacks={feedbacks} />
			<Average feedbacks={feedbacks} />
			<Positive feedbacks={feedbacks} />
		</ul>
	);
};

const Footer = ({ feedbacks }) => {
	return (
		<>
			<h2>Statistics</h2>
			{calcTotal(feedbacks) > 0 ? <Statitics feedbacks={feedbacks} /> : ""}
		</>
	);
};

const calcTotal = (feedbacks) => {
	return feedbacks.good + feedbacks.neutral + feedbacks.bad;
};

const Total = ({ feedbacks }) => {
	return <li>All: {calcTotal(feedbacks)}</li>;
};

const Average = ({ feedbacks }) => {
	const values = { good: 1, neutral: 0, bad: -1 };
	const good = feedbacks.good * values.good;
	const neutral = feedbacks.neutral * values.neutral;
	const bad = feedbacks.bad * values.bad;

	const average = calcTotal(feedbacks) > 0 ? (good + neutral + bad) / calcTotal(feedbacks) : 0;
	return <li>Average: {average}</li>;
};

const Positive = ({ feedbacks }) => {
	const positive = calcTotal(feedbacks) > 0 ? (feedbacks.good / calcTotal(feedbacks)) * 100 : 0;
	return <li>Positive: {positive} %</li>;
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
