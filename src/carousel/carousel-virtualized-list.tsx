/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { getRealIndex } from './helpers';

type CarouselElementWrapperProps = {
	children: React.ReactNode;
	isCurrent: boolean;
	identifier: string;
	index: number;
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
	index,
	identifier,
	onClickIndex,
}) => (
	<div
		aria-hidden
		data-virtual-index={identifier}
		className={isCurrent ? 'current' : undefined}
		css={elementStyle}
		onClick={(): void => onClickIndex(index)}
	>
		{children}
	</div>
);

type CarouselVirtualizedListProps = {
	totalBaseItems: number;
	renderItemAtIndex: (
		index: number,
		virtualIndex: number,
	) => React.ReactElement;
	startIndex: number;
	endIndex: number;
	currentOverallIndex: number;
	onClickIndex: CarouselElementWrapperProps['onClickIndex'];
};

export const CarouselVirtualizedList: React.FC<
	CarouselVirtualizedListProps
> = ({
	totalBaseItems,
	renderItemAtIndex,
	currentOverallIndex,
	startIndex,
	endIndex,
	onClickIndex,
}) => {
	// Don't know if shakti polyfills Array.from, so we'll use the old way
	// eslint-disable-next-line unicorn/no-new-array
	const contents = new Array(endIndex - startIndex + 1)
		.fill('')
		.map((_, i) => {
			const currentIndex = startIndex + i;
			return (
				<CarouselElementWrapper
					key={currentIndex}
					identifier={`${currentIndex}`}
					isCurrent={currentIndex === currentOverallIndex}
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
