/* @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TinySlider, { TinySliderProps } from 'tiny-slider-react';

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
	nav: false,
	// @ts-expect-error - types not up to date
	center: true,
	items: 2,
	controls: false,
};

type TinySliderCarouselDemoProps = {
	onChangeIndex: (index: number) => void;
	currentIndex: number;
	plans: { name: string; price: string }[];
};
export const TinySliderCarouselDemo: React.FC<TinySliderCarouselDemoProps> = ({
	currentIndex,
	onChangeIndex,
	plans,
}) => {
	const tinySliderRef = useRef<TinySlider | null>(null);
	const [initialized, setInitialized] = useState(false);

	const tinySliderElements: React.ReactElement[] = useMemo(
		() =>
			plans.map(({ name, price }, index) => (
				<div
					aria-hidden
					css={elementStyles}
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					style={{ position: 'relative' }}
					onClick={(): void => {
						if (tinySliderRef.current) {
							// @ts-expect-error - slider ref isn't well typed
							tinySliderRef.current.slider.goTo(index);
						}
					}}
				>
					<h3>{name}</h3>
					<sub>{price}</sub>
				</div>
			)),
		[plans],
	);

	useEffect(() => {
		const callback = (info: any): void => {
			if (info.displayIndex - 1 !== currentIndex) {
				onChangeIndex(info.displayIndex - 1);
			}
		};
		if (initialized) {
			// @ts-expect-error - lol hanging things on html objects
			tinySliderRef.current.slider.events.on?.('indexChanged', callback);
		}
		return () => {
			// @ts-expect-error - lol hanging things on html objects
			tinySliderRef.current?.slider?.events.off?.(
				'indexChanged',
				callback,
			);
		};
	}, [initialized, currentIndex, onChangeIndex]);

	useEffect(() => {
		// @ts-expect-error - lol hanging things on html objects
		tinySliderRef.current?.slider?.goTo?.(currentIndex);
	}, [currentIndex]);

	return (
		<>
			<h2 style={{ marginTop: '50px' }}>Tiny Slider Demo</h2>
			<div style={{ border: 'dashed 2px gray' }}>
				<TinySlider
					settings={tinySliderSettings}
					ref={(el): void => {
						tinySliderRef.current = el;
						setInitialized(() => true);
					}}
				>
					{tinySliderElements}
				</TinySlider>
			</div>
			<h4>🎉 Benefits</h4>
			<ul>
				<li>We didn't write it and don't need to maintain it.</li>
			</ul>
			<h4>🤔 Concerns</h4>
			<ul>
				<li>
					I am doing truly yucky feeling things to make it work. The
					mismatch between imperative and declarative styles is very
					brittle.
				</li>
				<li>
					I'm not sure how to make it animate in a way that isn't
					low-level dom manipulation and trying to fend off React
					re-rendering on top of what I've done.
				</li>
			</ul>
			<h4>🚧 Current Blockers</h4>
			<ul>
				<li>
					Can&apos;t click elements that are not the first children
					sent to the carousel. So if you scroll over, clicks stop
					working. So we'd have to change the design if we wanted to
					use this to not react to touching/clicking the elements.
					This seems like a big ask, especially on desktop.
				</li>
				<li>
					When commanded externally, it does&apso; go to nearest, but
					prefers absolute index. So if you swipe on the bottom of the
					page, and it updates the index to 0 from 3, the bottom half
					will swipe in from the right, but the top half will do a 4
					element scroll to the left.
				</li>
			</ul>
		</>
	);
};
