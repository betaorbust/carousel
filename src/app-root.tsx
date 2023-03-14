/* @jsxImportSource @emotion/react */
import React, { useCallback, useMemo, useState } from 'react';
import { CarouselContainer } from './carousel-container';
import { CarouselControls } from './carousel-controls';

const plans = [
	{
		name: '0. Crunch Wrap Supreme',
		price: '$40.00',
	},
	{
		name: '1. Family but not all your family',
		price: '$20.00',
	},
	{
		name: '2. Jr. One Bedroom',
		price: '$10.00',
	},
	{
		name: `3. Please don't pick this one`,
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
			<h1>Carousel demo</h1>
			<div>Current selection {currentIndex}</div>
			<br />
			<CarouselContainer onChange={onChange} currentIndex={currentIndex}>
				{elements}
			</CarouselContainer>
			<CarouselControls
				indexLabels={plans.map(({ name }) => name)}
				onChange={onChange}
				currentIndex={currentIndex}
			/>
		</div>
	);
};
