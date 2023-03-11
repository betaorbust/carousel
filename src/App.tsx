/* @jsxImportSource @emotion/react */
import React, { useCallback, useMemo, useState } from 'react';
import { SwipeContainer } from './swipe-container';

const plans = [
	{
		name: 'Crunch Wrap Supreme',
		price: '$40.00',
	},
	{
		name: 'Family but not all your family',
		price: '$20.00',
	},
	{
		name: 'Jr. One Bedroom',
		price: '$10.00',
	},
	{
		name: `Please don't pick this one`,
		price: '$5.99',
	},
] as const;

export const App: React.FC = function App() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const onChange = useCallback((index: number) => {
		setCurrentIndex(index);
	}, []);
	const elements = useMemo(
		() =>
			plans.map(({ name, price }) => (
				<div key={name} style={{ width: '200px' }}>
					{name}
					<br />
					{price}
				</div>
			)),
		[],
	);

	return (
		<div className="App">
			<h1>Slider demo</h1>
			<div>Current selection {currentIndex}</div>
			<br />
			<SwipeContainer onChange={onChange} currentIndex={currentIndex}>
				{elements}
			</SwipeContainer>
		</div>
	);
};
