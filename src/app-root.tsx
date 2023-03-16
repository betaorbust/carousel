/* @jsxImportSource @emotion/react */
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { css, Global } from '@emotion/react';
import TinySlider, { TinySliderProps } from 'tiny-slider-react';
import { Carousel, CarouselItem, CarouselControls } from './carousel';
import 'tiny-slider/dist/tiny-slider.css';

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
	transition: transform 0.2s ease-in-out;
	.current & {
		transform: scale(1.1);
	}
`;

const tinySliderSettings: TinySliderProps['settings'] = {
	mouseDrag: true,
	nav: true,
	// @ts-expect-error - types not up to date
	center: true,
	items: 3.5,
};

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
	const tinySliderRef = useRef<TinySlider | null>(null);
	const initialDemoElements: React.ReactElement[] = useMemo(
		() =>
			plans.map(({ name, price }) => (
				<CarouselItem key={name} itemKey={name}>
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

	const tinySliderElements: React.ReactElement[] = useMemo(
		() =>
			plans.map(({ name, price }, index) => (
				<div
					aria-hidden
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					style={{ position: 'relative' }}
					onClick={(): void => {
						if (tinySliderRef.current) {
							// @ts-expect-error - whaa
							tinySliderRef.current.slider.goTo(index);
						}
					}}
				>
					<h3>{name}</h3>
					<sub>{price}</sub>
				</div>
			)),
		[],
	);

	useEffect(() => {
		if (tinySliderRef.current) {
			// @ts-expect-error - whaa
			tinySliderRef.current.slider.goTo(currentIndex);
		}
	}, [currentIndex]);

	return (
		<>
			<Global styles={globalStyles} />
			<div className="App" css={appStyles}>
				<h1>Carousel Demos</h1>

				<div>Current selection {currentIndex}</div>
				<h2>Initial Carousel Demo</h2>
				<br />
				<div style={{ border: 'dashed 2px gray' }}>
					<Carousel
						onClickIndex={onChange}
						currentIndex={currentIndex}
					>
						{initialDemoElements}
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
				<h2>Tiny Slider Demo</h2>

				<TinySlider
					settings={tinySliderSettings}
					ref={(el): void => {
						tinySliderRef.current = el;
					}}
				>
					{tinySliderElements}
				</TinySlider>
			</div>
		</>
	);
};
