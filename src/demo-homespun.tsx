/* @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useCallback } from 'react';
import { CarouselItem } from './carousel/carousel-item';
import { Carousel } from './carousel/carousel';
import { getRealIndex } from './carousel/helpers';

const elementStyles = css`
	width: 200px;
	display: flex;
	flex-direction: column;
	padding: 15px;
	border: solid 1px gray;
	border-radius: 25px;
	box-sizing: border-box;
	margin: 10px 5px;
	opacity: 0.5;
	transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
	background-color: white;
	z-index: 1;
	position: relative;
	user-select: none;
	.current & {
		transform: scale(1.1);
		opacity: 1;
		z-index: 1000;
	}
	h3 {
		margin: 0;
	}
`;

const indexStyle = css`
	position: absolute;
	top: 5px;
	right: 5px;
	font-size: 0.6em;
	text-align: center;
	background-color: white;
	border-radius: 50%;
	border: solid 1px gray;
	padding: 5px;
`;

type DemoProps = {
	onChangeIndex: (index: number) => void;
	currentIndex: number;
	plans: { name: string; price: string }[];
};

export const CarouselDemo: React.FC<DemoProps> = ({
	onChangeIndex,
	currentIndex,
	plans,
}) => {
	// Make up a function to render an arbitrary card at any given index
	const renderItem = useCallback(
		(index: number): React.ReactElement => {
			// Pick a plan based on the index of the item in the carousel.
			const planIndex = getRealIndex(index, plans.length);
			const { name, price } = plans[planIndex];
			return (
				<CarouselItem key={name} itemKey={name}>
					<div css={elementStyles}>
						<div>
							<h3>{name}</h3>
							<sub>{price}</sub>
							<div css={indexStyle}>{index}</div>
						</div>
					</div>
				</CarouselItem>
			);
		},
		[plans],
	);

	return (
		<>
			<h2 style={{ marginTop: '50px' }}>Homespun Carousel Demo</h2>
			<div style={{ border: 'dashed 2px gray' }}>
				<Carousel
					onClickIndex={onChangeIndex}
					currentIndex={currentIndex}
					itemCount={plans.length}
					itemWidth={200}
					renderItemAtIndex={renderItem}
					swipeMaxDurationMs={400}
					swipeMinDistancePx={8}
					animationDurationMs={250}
					virtualListSize={plans.length * 6}
					preventScrolling
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
					<strong>Update:</strong> Now fully virtualized list means
					the animation does not pop around. 🎉
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
		</>
	);
};
