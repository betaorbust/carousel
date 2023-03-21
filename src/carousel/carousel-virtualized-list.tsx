/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { CarouselItemProps } from './carousel-item';
import { getLayoutStart } from './helpers';

type CarouselElementWrapperProps = {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	isCurrent: boolean;
	identifier: string;
};

const elementStyle = css`
	align-items: stretch;
	flex: 1 1 auto;
`;

const CarouselElementWrapper: React.FC<CarouselElementWrapperProps> = ({
	children,
	onClick,
	isCurrent,
	identifier,
}) => (
	<div
		aria-hidden
		data-virtual-index={identifier}
		className={isCurrent ? 'current' : undefined}
		onClick={onClick}
		css={elementStyle}
	>
		{children}
	</div>
);

type CarouselVirtualizedListProps = {
	children: React.ReactElement<CarouselItemProps>[];
	onClickIndex: (index: number) => void;
	currentOverallIndex: number;
};

export const CarouselVirtualizedList: React.FC<
	CarouselVirtualizedListProps
> = ({ children, onClickIndex, currentOverallIndex }) => {
	const before: Array<React.ReactElement> = [];
	const real: Array<React.ReactElement> = [];
	const after: Array<React.ReactNode> = [];
	const childCount = React.Children.count(children);

	// where we start to lay the primary elements out
	const layoutStartIndex = getLayoutStart(currentOverallIndex, childCount);
	React.Children.forEach(children, (child, childIndex) => {
		if (!React.isValidElement(child)) {
			return;
		}
		let { key: childKey } = child;
		if (!childKey) {
			console.error('Key required for animation.');
			childKey = `key-${childIndex}`;
		}
		const elementIndex = layoutStartIndex + childIndex;
		before.push(
			<CarouselElementWrapper
				// One element set offset to negative
				key={`${childKey}:${elementIndex - childCount}`}
				identifier={`${elementIndex - childCount}`}
				isCurrent={false}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{elementIndex - childCount}
				{React.cloneElement(child)}
			</CarouselElementWrapper>,
		);
		real.push(
			<CarouselElementWrapper
				// The centered element
				key={`${childKey}:${elementIndex}`}
				identifier={`${elementIndex}`}
				isCurrent={currentOverallIndex === elementIndex}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{elementIndex}
				{child}
			</CarouselElementWrapper>,
		);
		after.push(
			<CarouselElementWrapper
				// One element set offset to positive
				key={`${childKey}:${elementIndex + childCount}`}
				identifier={`${elementIndex + childCount}`}
				isCurrent={false}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{elementIndex + childCount}
				{React.cloneElement(child)}
			</CarouselElementWrapper>,
		);
	});

	// eslint-disable-next-line react/jsx-no-useless-fragment -- typescript?
	return <>{[...before, ...real, ...after]}</>;
};
