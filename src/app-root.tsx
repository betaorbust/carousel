/* @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, Global } from '@emotion/react';
import { CarouselControls } from './carousel-controls';
import { CarouselDemo } from './demo-homespun';
import { Props } from './props';

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
	const onChange = setCurrentIndex;

	const [itemWidth, setItemWidth] = useState(200);
	const [swipeMaxDurationMs, setSwipeMaxDurationMs] = useState(400);
	const [swipeMinDistancePx, setSwipeMinDistancePx] = useState(8);
	const [animationDurationMs, setAnimationDurationMs] = useState(250);
	const [virtualListSize, setVirtualListSize] = useState(plans.length * 6);
	const [preventScrolling, setPreventScrolling] = useState(true);

	return (
		<>
			<Global styles={globalStyles} />
			<div className="App" css={appStyles}>
				<h1>Carousel Demo</h1>
				<p>
					The state is held at the page level and flows into every
					component. Otherwise there isn&apos;t a great way to
					coordinate multiple linked sliders.
				</p>
				<div>
					<strong>Current selection</strong>: {currentIndex}
				</div>
				<Props
					itemWidth={itemWidth}
					setItemWidth={setItemWidth}
					swipeMaxDurationMs={swipeMaxDurationMs}
					setSwipeMaxDurationMs={setSwipeMaxDurationMs}
					swipeMinDistancePx={swipeMinDistancePx}
					setSwipeMinDistancePx={setSwipeMinDistancePx}
					animationDurationMs={animationDurationMs}
					setAnimationDurationMs={setAnimationDurationMs}
					virtualListSize={virtualListSize}
					setVirtualListSize={setVirtualListSize}
					preventScrolling={preventScrolling}
					setPreventScrolling={setPreventScrolling}
				/>

				<CarouselDemo
					currentIndex={currentIndex}
					onChangeIndex={onChange}
					plans={plans}
					itemWidth={itemWidth}
					swipeMaxDurationMs={swipeMaxDurationMs}
					swipeMinDistancePx={swipeMinDistancePx}
					animationDurationMs={animationDurationMs}
					virtualListSize={virtualListSize}
					preventScrolling={preventScrolling}
				/>

				<h2>Accessible selector:</h2>
				<p>
					The state of the carousel can be set externally with no
					knowledge of the virtual list inside the carousel. As an
					infinite list is not friendly for screen readers or keyboard
					navigation, a navigation unit like this can be used to
					provide accessible access.
				</p>
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

				<h4>🎉 Benefits</h4>
				<ul>
					<li>We know it works in our browser matrix.</li>
					<li>It has top-down state as a design criteria.</li>
					<li>It can actually do what this design requires 😭</li>
				</ul>
				<h4>🤔 Concerns</h4>
				<ul>
					<li>It is a lot of bespoke code.</li>
				</ul>
				<h4>🚧 Current Blockers</h4>
				<ul>
					<li>
						✅ <del>Animation when wrapping virtual list pops</del>
						<br />
						<strong>Update:</strong> Now fully virtualized list
						means the animation does not pop around. 🎉
					</li>
					<li>
						✅{' '}
						<del>
							Only responds to swipe, not tracking finger like the
							fancier ones.
						</del>
						<br />
						<strong>Update:</strong> Now has finger tracking! 🎉
					</li>
					<li>
						❌ I have not looked at RTL yet and we probably need to
						understand what we want to do in that case.
					</li>
				</ul>
			</div>
		</>
	);
};
