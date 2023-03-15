/* @jsxImportSource @emotion/react */
import React, { useCallback, useMemo, useState } from 'react';
import { css, Global } from '@emotion/react';
import { Carousel, CarouselItem, CarouselControls } from './carousel';

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
	color: #333;
`;

const elementStyles = css`
	width: 200px;
	display: flex;
	flex-direction: column;
	padding: 15px;
	border: solid 1px gray;
	border-radius: 25px;
	box-sizing: border-box;
	margin: 5px 5px;
`;

const plans = [
	{
		name: '0. Crunch Wrap Supreme',
		price: '$40.00',
	},
	{
		name: '1. Family but not for Mark',
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

export const App: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const onChange = useCallback((index: number) => {
		setCurrentIndex(index);
	}, []);
	const elements: React.ReactElement[] = useMemo(
		() =>
			plans.map(({ name, price }) => (
				<CarouselItem key={name}>
					<div css={elementStyles}>
						<div>
							<h3>{name}</h3>
							<sub>{price}</sub>
						</div>
					</div>
				</CarouselItem>
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
					<Carousel
						onClickIndex={onChange}
						currentIndex={currentIndex}
					>
						{elements}
					</Carousel>
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
