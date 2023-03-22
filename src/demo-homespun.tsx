/* @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useCallback } from 'react';
import { CarouselItem } from './carousel/carousel-item';
import { Carousel } from './carousel/carousel';
import { getRealIndex } from './carousel/helpers';

const elementStyles = css`
	display: flex;
	flex-direction: column;
	padding: 15px;
	border: solid 1px gray;
	border-radius: 25px;
	box-sizing: border-box;
	margin: 10px 5px;
	opacity: 0.5;
	// This is set unrealistically high so that the animation barely starts
	// before we supersede the transition with the on-element style
	transition: transform 10s ease-in-out, opacity 10s ease-in-out;
	color: white;
	z-index: 1;
	position: relative;
	user-select: none;
	background: linear-gradient(
			318.25deg,
			#e50914 0%,
			rgba(74, 42, 150, 0.5) 92.16%,
			rgba(74, 42, 150, 0) 128.15%
		),
		#1d529d;
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
	bottom: 4px;
	right: 4px;
	min-width: 3em;
	min-height: 3em;
	font-size: 0.6em;
	text-align: center;
	background-color: white;
	color: darkgray;
	border-radius: 50%;
	border: solid 1px gray;
	padding: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

type DemoProps = {
	onChangeIndex: (index: number) => void;
	currentIndex: number;
	plans: { name: string; price: string }[];
	itemWidth: number;
	swipeMaxDurationMs: number;
	swipeMinDistancePx: number;
	animationDurationMs: number;
	virtualListSize: number;
	preventScrolling: boolean;
};

export const CarouselDemo: React.FC<DemoProps> = ({
	onChangeIndex,
	currentIndex,
	plans,
	itemWidth,
	swipeMaxDurationMs,
	swipeMinDistancePx,
	animationDurationMs,
	virtualListSize,
	preventScrolling,
}) => {
	// Make up a function to render an arbitrary card at any given index
	const renderItem = useCallback(
		(index: number): React.ReactElement => {
			// Pick a plan based on the index of the item in the carousel.
			const planIndex = getRealIndex(index, plans.length);
			const { name, price } = plans[planIndex];
			return (
				<CarouselItem key={name} itemKey={name}>
					<div
						css={elementStyles}
						style={{
							width: `${itemWidth}px`,
							transition: `transform ${
								animationDurationMs / 1000
							}s ease-in-out, opacity ${
								animationDurationMs / 1000
							}s ease-in-out`,
						}}
					>
						<div>
							<h3>{name}</h3>
							<sub>{price}</sub>
							<div css={indexStyle}>{index}</div>
						</div>
					</div>
				</CarouselItem>
			);
		},
		[plans, itemWidth, animationDurationMs],
	);

	return (
		<>
			<h2 style={{ marginTop: '50px' }}>Carousel Demo</h2>
			<p>
				This carousel can handle swipes, drags, clicks/touches, provides
				an infinitely scrollable list of virtualized elements, and is
				built to support major browsers back to 2015.
			</p>
			<div style={{ border: 'dashed 2px gray' }}>
				<Carousel
					onClickIndex={onChangeIndex}
					currentIndex={currentIndex}
					itemCount={plans.length}
					itemWidth={itemWidth}
					renderItemAtIndex={renderItem}
					swipeMaxDurationMs={swipeMaxDurationMs}
					swipeMinDistancePx={swipeMinDistancePx}
					animationDurationMs={animationDurationMs}
					virtualListSize={virtualListSize}
					preventScrolling={preventScrolling}
				/>
			</div>
		</>
	);
};
