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
	return (
		<>
			<td>{text}</td>
			<td>{value}</td>
		</>
	);
};

const calcTotal = (feedbacks) => {
	return feedbacks.good + feedbacks.neutral + feedbacks.bad;
};

const Total = ({ text, value }) => {
	return (
		<>
			<td>{text}</td>
			<td>{calcTotal(value)}</td>
		</>
	);
};

const Average = ({ text, value }) => {
	const values = { good: 1, neutral: 0, bad: -1 };
	const good = value.good * values.good;
	const neutral = value.neutral * values.neutral;
	const bad = value.bad * values.bad;

	const average = calcTotal(value) > 0 ? (good + neutral + bad) / calcTotal(value) : 0;
	return (
		<>
			<td>{text}</td>
			<td>{average}</td>
		</>
	);
};

const Positive = ({ text, value }) => {
	const positive = calcTotal(value) > 0 ? (value.good / calcTotal(value)) * 100 : 0;
	return (
		<>
			<td>{text}</td>
			<td>{positive} %</td>
		</>
	);
};

const StatisticLine = ({ text, value }) => {
	if (text === "Good" || text === "Neutral" || text === "Bad") return <Feedbacks text={text} value={value} />;
	if (text === "All") return <Total text={text} value={value} />;
	if (text === "Average") return <Average text={text} value={value} />;
	if (text === "Positive") return <Positive text={text} value={value} />;
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
			<h2>Statistics</h2>
			{calcTotal(feedbacks) === 0 ? (
				""
			) : (
				// prettier-ignore
				<table>
					<thead>
						<tr>
							<th style={{ minWidth: '5rem' }}></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr><StatisticLine text="Good" value={feedbacks.good} /></tr>					
						<tr><StatisticLine text="Bad" value={feedbacks.bad} /></tr>
						<tr><StatisticLine text="All" value={feedbacks} /></tr>
						<tr><StatisticLine text="Average" value={feedbacks} /></tr>
						<tr><StatisticLine text="Neutral" value={feedbacks.neutral} /></tr>
						<tr><StatisticLine text="Positive" value={feedbacks} /></tr>
					</tbody>
				</table>
			)}
		</div>
	);
};

export default App;
