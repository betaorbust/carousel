/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { getRealIndex } from './helpers';

type CarouselElementWrapperProps = {
	children: React.ReactNode;
	identifier: string;
	index: number;
	isCurrent: boolean;
	isShownToScreenReaders: boolean;
	onClickIndex: (index: number) => void;
};

const elementStyle = css`
	align-items: stretch;
	flex: 1 1 auto;
	display: flex;
`;

const CarouselElementWrapper: React.FC<CarouselElementWrapperProps> = ({
	children,
	isCurrent,
	isShownToScreenReaders,
	index,
	identifier,
	onClickIndex,
}) => (
	// Keyboard navigation is handled by the Navigation Buttons
	// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
	<div
		aria-hidden={!isShownToScreenReaders}
		data-virtual-index={identifier}
		className={isCurrent ? 'current' : undefined}
		css={elementStyle}
		onClick={(): void => onClickIndex(index)}
	>
		{children}
	</div>
);

export type CarouselVirtualizedListProps = {
	totalBaseItems: number;
	renderItemAtIndex: (
		index: number,
		virtualIndex: number,
	) => React.ReactElement;
	startIndex: number;
	endIndex: number;
	currentOverallIndex: number;
	onClickIndex: CarouselElementWrapperProps['onClickIndex'];
	itemsToScreenReaders: 'none' | 'current';
};

export const CarouselVirtualizedList: React.FC<
	CarouselVirtualizedListProps
> = ({
	currentOverallIndex,
	endIndex,
	onClickIndex,
	renderItemAtIndex,
	startIndex,
	totalBaseItems,
	itemsToScreenReaders,
}) => {
	// Don't know if shakti polyfills Array.from, so we'll use the old way
	// eslint-disable-next-line unicorn/no-new-array
	const contents = new Array(endIndex - startIndex + 1)
		.fill('')
		.map((_, i) => {
			const currentIndex = startIndex + i;
			const isCurrent = currentIndex === currentOverallIndex;
			return (
				<CarouselElementWrapper
					key={currentIndex}
					identifier={`${currentIndex}`}
					isCurrent={isCurrent}
					isShownToScreenReaders={
						itemsToScreenReaders === 'current' && isCurrent
					}
					onClickIndex={onClickIndex}
					index={currentIndex}
				>
					{renderItemAtIndex(
						getRealIndex(startIndex + i, totalBaseItems),
						startIndex + i,
					)}
				</CarouselElementWrapper>
			);
		});

	// As far as typescript is concerned, this is not a useless fragment
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{contents}</>;
};
