/* @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

type PropsProps = {
	itemWidth: number;
	setItemWidth: React.Dispatch<React.SetStateAction<number>>;
	swipeMaxDurationMs: number;
	setSwipeMaxDurationMs: React.Dispatch<React.SetStateAction<number>>;
	swipeMinDistancePx: number;
	setSwipeMinDistancePx: React.Dispatch<React.SetStateAction<number>>;
	animationDurationMs: number;
	setAnimationDurationMs: React.Dispatch<React.SetStateAction<number>>;
	virtualListSize: number;
	setVirtualListSize: React.Dispatch<React.SetStateAction<number>>;
	preventScrolling: boolean;
	setPreventScrolling: React.Dispatch<React.SetStateAction<boolean>>;
};
const tableStyles = css`
	border-collapse: separate;
	border-spacing: 10px;
	margin: 0 auto;
`;

const labelTdStyles = css`
	max-width: 300px;
	text-align: right;
`;
const labelStyles = css`
	font-family: monospace;
	font-weight: bold;
	font-size: 1.3em;
`;
const inputStyles = css`
	vertical-align: top;
`;

export const Props: React.FC<PropsProps> = ({
	itemWidth,
	setItemWidth,
	swipeMaxDurationMs,
	setSwipeMaxDurationMs,
	swipeMinDistancePx,
	setSwipeMinDistancePx,
	animationDurationMs,
	setAnimationDurationMs,
	virtualListSize,
	setVirtualListSize,
	preventScrolling,
	setPreventScrolling,
}) => {
	type InputType<T> = Readonly<
		[
			name: string,
			description: string,
			value: T,
			setValue: T extends boolean
				? typeof setPreventScrolling
				: typeof setAnimationDurationMs,
			type: T extends boolean ? 'checkbox' : 'numeric',
		]
	>;
	const inputs: Readonly<(InputType<number> | InputType<boolean>)[]> = [
		[
			'itemWidth',
			'How wide the elements in the carousel are',
			itemWidth,
			setItemWidth,
			'numeric',
		],
		[
			'swipeMaxDurationMs',
			'How long a touch or click event can last before a swipe turns into a drag',
			swipeMaxDurationMs,
			setSwipeMaxDurationMs,
			'numeric',
		],
		[
			'swipeMinDistancePx',
			'How far a touch or click event must travel before it is considered a swipe',
			swipeMinDistancePx,
			setSwipeMinDistancePx,
			'numeric',
		],
		[
			'animationDurationMs',
			'How long transitions last',
			animationDurationMs,
			setAnimationDurationMs,
			'numeric',
		],
		[
			'virtualListSize',
			'How many elements to have in the virtual slider',
			virtualListSize,
			setVirtualListSize,
			'numeric',
		],
		[
			'preventScrolling',
			'If we should prevent scrolling when the user is dragging',
			preventScrolling,
			setPreventScrolling,
			'checkbox',
		],
	] as const;

	return (
		<form onSubmit={(e): void => e.preventDefault()}>
			<h2>Props</h2>
			<p>The following properties can modify how the carousel works.</p>
			<table css={tableStyles}>
				{inputs.map(
					([name, description, value, setValue, itemType]) => (
						<tr key={name}>
							<td css={labelTdStyles}>
								<label css={labelStyles} htmlFor={name}>
									{name}:
								</label>
								<br />
								<sub>{description}</sub>
							</td>

							<td css={inputStyles}>
								<input
									id={name}
									value={`${value}`}
									onChange={(e): void => {
										if (itemType === 'checkbox') {
											setValue(e.target.checked);
										} else {
											setValue(Number(e.target.value));
										}
									}}
									checked={itemType === 'checkbox' && value}
									type={
										itemType === 'checkbox'
											? 'checkbox'
											: 'number'
									}
								/>
							</td>
						</tr>
					),
				)}
			</table>
		</form>
	);
};
