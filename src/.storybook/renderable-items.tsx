/* @jsxImportSource @emotion/react */
import React, { ComponentProps } from 'react';
import { css } from '@emotion/react';
import { CarouselItem } from '../carousel/carousel-item';
import { getRealIndex } from '../carousel/helpers';
import { Carousel } from '../carousel/carousel';

const elementStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 25%;
	border: solid 1px gray;
	border-radius: 6%;
	box-sizing: border-box;
	overflow: hidden;
	margin: 5% 3%;
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

export const makeRenderItem = ({
	itemWidth,
	animationDurationMs,
}: Pick<
	ComponentProps<typeof Carousel>,
	'animationDurationMs' | 'itemWidth'
>) => {
	return (index: number): React.ReactElement => {
		// Pick a plan based on the index of the item in the carousel.
		const planIndex = getRealIndex(index, plans.length);
		const { name, price } = plans[planIndex];
		return (
			<CarouselItem key={name} itemKey={name}>
				<div
					css={elementStyles}
					style={{
						width: `${itemWidth}px`,
						height: `${itemWidth}px`,
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
	};
};
