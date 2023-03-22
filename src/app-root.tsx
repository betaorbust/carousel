/* @jsxImportSource @emotion/react */
import React, { useCallback, useState } from 'react';
import { css, Global } from '@emotion/react';
import { CarouselControls } from './carousel-controls';
import { CarouselDemo } from './demo-homespun';

const globalStyles = css`
	& * {
		font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
			segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto,
			arial, sans-serif;
		box-sizing: border-box;
	}

	& h4 {
		margin-bottom: 0.5em;
	}

	& ul {
		margin-block-start: 0.25em;
	}
`;

const appStyles = css`
	margin: 0 auto;
	max-width: 700px;
	color: #333;
`;

const plans = [
	{
		name: '0. Crunch Wrap Supreme',
		price: '$40.00',
	},
	{
		name: '1. Family, but not for Mark',
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
];

export const App: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const onChange = useCallback((index: number) => {
		console.log('root onChange called, setting it to', index);
		setCurrentIndex(index);
	}, []);

	return (
		<>
			<Global styles={globalStyles} />
			<div className="App" css={appStyles}>
				<h1>Carousel Demos</h1>
				<p>
					The state is held at the page level and flows into every
					component. Otherwise there isn&apos;t a great way to
					coordinate the fact that the design has multiple linked
					sliders.
				</p>
				<div>
					<strong>Current selection</strong>: {currentIndex}
				</div>
				<h2>Global keyboard selector:</h2>
				<div style={{ margin: '10px auto', textAlign: 'center' }}>
					<CarouselControls
						indexLabels={plans.map(
							({ name, price }) =>
								`${name}. Available for ${price}`,
						)}
						onChange={onChange}
						currentIndex={currentIndex}
					/>
				</div>

				<CarouselDemo
					currentIndex={currentIndex}
					onChangeIndex={onChange}
					plans={plans}
				/>
			</div>
		</>
	);
};
