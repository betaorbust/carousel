/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

type CarouselControlsTypes = {
	indexLabels: string[];
	onChange: (index: number) => void;
	currentIndex: number;
	dir: 'ltr' | 'rtl';
};

const containerStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const controlsStyles = css`
	background: none;
	border: none;
	font-size: 1.5rem;
	padding: 0.5rem 0.7rem;
	margin: 0;
	color: #333;
	transition: font-size 0.2s ease-in-out;
	height: 3rem;
	&:last-of-type {
		margin-left: 1rem;
	}
	&:first-of-type {
		margin-right: 1rem;
	}
	display: flex;
	align-items: center;
`;

const selectedStyle = css`
	background-color: rebeccapurple;
	height: 1.5rem;
	width: 1.5rem;
`;

const indicatorStyles = css`
	display: inline-block;
	height: 1.1rem;
	width: 1.1rem;
	border: solid 2px #555;
	background-color: none;
	border-radius: 50%;
	transition: background-color 0.2s ease-in-out, height 0.2s ease-in-out,
		width 0.2s ease-in-out;
`;

export const CarouselControls: React.FC<CarouselControlsTypes> = ({
	indexLabels,
	onChange,
	currentIndex,
	dir,
}) => (
	<div css={containerStyles} dir={dir}>
		<button
			css={controlsStyles}
			type="button"
			title="Previous"
			onClick={(): void =>
				onChange(
					currentIndex <= 0
						? indexLabels.length - 1
						: currentIndex - 1,
				)
			}
		>
			{dir === 'ltr' ? '◀' : '▶'}
		</button>
		{indexLabels.map((label, index) => (
			<button
				css={[controlsStyles]}
				type="button"
				title={label}
				key={label}
				onClick={(): void => onChange(index)}
			>
				<span
					css={[
						indicatorStyles,
						index === currentIndex ? selectedStyle : null,
					]}
				/>
			</button>
		))}
		<button
			css={controlsStyles}
			type="button"
			title="Next"
			onClick={(): void =>
				onChange(
					currentIndex >= indexLabels.length - 1
						? 0
						: currentIndex + 1,
				)
			}
		>
			{dir === 'ltr' ? '▶' : '◀'}
		</button>
	</div>
);
