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
	margin: 5px 5px;
	opacity: 0.5;
	transition: transform 0.5s ease-in-out, opacity 1s ease-in-out;
	.current & {
		transform: scale(1.1);
		opacity: 1;
	}
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
					renderItemAtIndex={renderItem}
				/>
			</div>
			<h4>🎉 Benefits</h4>
			<ul>
				<li>We know it works in our browser matrix.</li>
				<li>It has top-down state as a design criteria.</li>
			</ul>
			<h4>🤔 Concerns</h4>
			<ul>
				<li>It is a lot of bespoke code.</li>
				<li>
					It is not as feature rich and will take effort to hit the
					features of a more fully-built-out library.
				</li>
			</ul>
			<h4>🚧 Current Blockers</h4>
			<ul>
				<li>
					<del>Animation when wrapping virtual list pops</del>{' '}
					<strong>Update:</strong> Now fully virtualized list means
					the animation does not pop around.
				</li>
				<li>
					Only responds to swipe, not tracking finger like the fancier
					ones. (This might not be a blocker, but it's deviating from
					the prototype.)
				</li>
			</ul>
		</>
	);
};
