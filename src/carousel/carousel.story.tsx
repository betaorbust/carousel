/* @jsxImportSource @emotion/react */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Carousel } from './carousel';
import { makeRenderItem } from '../.storybook/renderable-items';

export default {
	title: 'Carousel/Carousel',
	component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => {
	const { currentIndex, onClickIndex, itemWidth, animationDurationMs } = args;
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

	const renderItem = useMemo(
		() => makeRenderItem({ itemWidth, animationDurationMs }),
		[itemWidth, animationDurationMs],
	);

	return (
		<div
			style={{
				maxWidth: '700px',
				margin: '0 auto',
				border: 'dashed 1px darkgray',
			}}
		>
			<Carousel
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...args}
				currentIndex={internalIndex}
				onClickIndex={handleClickIndex}
				renderItemAtIndex={renderItem}
			/>
		</div>
	);
};

export const Basic = Template.bind({});

Basic.args = {
	currentIndex: 0,
	animationDurationMs: 250,
	itemCount: 4,
	virtualListSize: 16,
	itemWidth: 250,
	onClickIndex: (index): void => {
		console.log('clicked index', index);
	},
	preventScrolling: true,
	swipeMaxDurationMs: 500,
	swipeMinDistancePx: 50,
};
