/* @jsxImportSource @emotion/react */
import React, { useCallback, useMemo, useState } from 'react';
import { css, Global } from '@emotion/react';
import { CarouselContainer } from './carousel-container';
import { CarouselControls } from './carousel-controls';

const globalStyles = css`
	* {
		font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
			segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto,
			arial, sans-serif;
		box-sizing: border-box;
	}
`;

const appStyles = css`
	margin: 0 auto;
	max-width: 700px;
`;

const elementStyles = css`
	width: 200px;
	display: flex;
	flex-direction: column;
	padding: 15px;
	border: solid 1px gray;
	border-radius: 25px;
	box-sizing: border-box;
	height: 100%;
	margin: 0 5px;
`;

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
				<div key={name} css={elementStyles}>
					<div>
						<h3>{name}</h3>
						<sub>{price}</sub>
					</div>
				</div>
			)),
		[],
	);

	return (
		<>
			<Global styles={globalStyles} />
			<div className="App" css={appStyles}>
				<h1>Carousel demo</h1>
				<div>Current selection {currentIndex}</div>
				<br />
				<div style={{ border: 'dashed 2px gray' }}>
					<CarouselContainer
						onChange={onChange}
						currentIndex={currentIndex}
					>
						{elements}
					</CarouselContainer>
				</div>
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
			</div>
		</>
	);
};
