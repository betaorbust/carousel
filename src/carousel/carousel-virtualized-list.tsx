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
		data-carousel-id={identifier}
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
	// const layoutStartIndex = getLayoutStart(currentOverallIndex, childCount);
	const layoutStartIndex = childCount;
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
		const beforeId = `${childKey}:${elementIndex - childCount}`;
		const id = `${childKey}:${elementIndex}`;
		const afterId = `${childKey}:${elementIndex + childCount}`;
		before.push(
			<CarouselElementWrapper
				// One element set offset to negative
				key={beforeId}
				identifier={beforeId}
				isCurrent={false}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{beforeId}
				{React.cloneElement(child)}
			</CarouselElementWrapper>,
		);
		real.push(
			<CarouselElementWrapper
				// The centered element
				key={id}
				identifier={id}
				isCurrent={currentOverallIndex === elementIndex}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{`${childKey}-${elementIndex}`}
				{child}
			</CarouselElementWrapper>,
		);
		after.push(
			<CarouselElementWrapper
				// One element set offset to positive
				key={afterId}
				identifier={afterId}
				isCurrent={false}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{afterId}
				{React.cloneElement(child)}
			</CarouselElementWrapper>,
		);
	});

	// eslint-disable-next-line react/jsx-no-useless-fragment -- typescript?
	return <>{[...before, ...real, ...after]}</>;
};
