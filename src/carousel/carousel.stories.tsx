/* @jsxImportSource @emotion/react */
import { Meta, StoryFn } from '@storybook/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Carousel } from './carousel';
import { CarouselControls } from './carousel-controls';
import {
	makeIndexLabels,
	makeRenderItem,
} from '../../.storybook/renderable-items';

export default {
	title: 'Carousel/Carousel',
	component: Carousel,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story, context): React.ReactElement => (
			<div
				style={{
					maxWidth: '700px',
					border: 'dashed 1px darkgray',
				}}
			>
				<Story {...context} />
			</div>
		),
	],
} as Meta<typeof Carousel>;

const useSharedIndex = (
	currentIndex,
	onClickIndex,
): Readonly<
	[number, React.ComponentProps<typeof Carousel>['onClickIndex']]
> => {
	const [internalIndex, setInternalIndex] = React.useState(currentIndex);
	useEffect(() => {
		setInternalIndex(currentIndex);
	}, [currentIndex]);

	const handleClickIndex = useCallback(
		(index: number): void => {
			setInternalIndex(index);
			onClickIndex(index);
		},
		[onClickIndex],
	);

	return [internalIndex, handleClickIndex] as const;
};

export const Basic: StoryFn<typeof Carousel> = (args) => {
	const { currentIndex, onClickIndex, itemWidth, animationDurationMs } = args;
	const [internalCurrentIndex, internalOnClickIndex] = useSharedIndex(
		currentIndex,
		onClickIndex,
	);
	const renderItemAtIndex = useMemo(
		() => makeRenderItem({ itemWidth, animationDurationMs }),
		[itemWidth, animationDurationMs],
	);

	return (
		<Carousel
			{...args}
			currentIndex={internalCurrentIndex}
			onClickIndex={internalOnClickIndex}
			renderItemAtIndex={renderItemAtIndex}
		/>
	);
};

Basic.args = {
	currentIndex: 0,
	animationDurationMs: 250,
	itemCount: 4,
	virtualListSize: 16,
	itemWidth: 250,
	preventScrolling: true,
	swipeMaxDurationMs: 500,
	swipeMinDistancePx: 50,
};

/**
 * As an infinite list is not friendly for screen readers or keyboard
 * navigation, the carousel itself is hidden from both keyboard focus as well as
 * screen readers. Instead a navigation unit like this can be used to provide
 * accessible access.
 *
 * ```tsx
 * const Demo = () => {
 * 	const [currentIndex, setCurrentIndex] = useState(0);
 *
 * 	// Provide human readable titles for each navigation item;
 * 	const indexLabels = useMemo(() => {
 * 		// ...
 * 	}, []);
 *
 * 	return (
 * 		<>
 * 			<Carousel
 * 				{...otherPropsLeftOutForBrevity}
 * 				currentIndex={currentIndex}
 * 				onClickIndex={setCurrentIndex}
 * 			/>
 * 			<CarouselControls
 * 				currentIndex={currentIndex}
 * 				indexLabels={indexLabels}
 * 				onChange={setCurrentIndex}
 * 			/>
 * 		</>
 * 	);
 * };
 * ```
 */
export const WithControls: StoryFn<typeof Carousel> = (args) => {
	const { currentIndex, onClickIndex, itemWidth, animationDurationMs } = args;
	const [internalCurrentIndex, internalOnClickIndex] = useSharedIndex(
		currentIndex,
		onClickIndex,
	);
	const renderItemAtIndex = useMemo(
		() => makeRenderItem({ itemWidth, animationDurationMs }),
		[itemWidth, animationDurationMs],
	);
	const indexLabels = useMemo(() => makeIndexLabels(), []);

	return (
		<>
			<Carousel
				{...args}
				currentIndex={internalCurrentIndex}
				onClickIndex={internalOnClickIndex}
				renderItemAtIndex={renderItemAtIndex}
			/>
			<CarouselControls
				currentIndex={internalCurrentIndex}
				indexLabels={indexLabels}
				onChange={internalOnClickIndex}
			/>
		</>
	);
};
WithControls.args = Basic.args;

export const WithLinkedCarousels: StoryFn<typeof Carousel> = (args) => {
	const { currentIndex, onClickIndex, itemWidth, animationDurationMs } = args;
	const [internalCurrentIndex, internalOnClickIndex] = useSharedIndex(
		currentIndex,
		onClickIndex,
	);
	const renderItemAtIndex = useMemo(
		() => makeRenderItem({ itemWidth, animationDurationMs }),
		[itemWidth, animationDurationMs],
	);
	const indexLabels = useMemo(() => makeIndexLabels(), []);

	return (
		<>
			<Carousel
				{...args}
				currentIndex={internalCurrentIndex}
				onClickIndex={internalOnClickIndex}
				renderItemAtIndex={renderItemAtIndex}
			/>
			<CarouselControls
				currentIndex={internalCurrentIndex}
				indexLabels={indexLabels}
				onChange={internalOnClickIndex}
			/>
			<Carousel
				{...args}
				currentIndex={internalCurrentIndex}
				onClickIndex={internalOnClickIndex}
				renderItemAtIndex={renderItemAtIndex}
			/>
		</>
	);
};
WithLinkedCarousels.args = Basic.args;
