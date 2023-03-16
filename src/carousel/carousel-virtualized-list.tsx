/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { CarouselItemProps } from './carousel-item';

type CarouselElementWrapperProps = {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	isCurrent: boolean;
};

const elementStyle = css`
	align-items: stretch;
	flex: 1 1 auto;
`;

const CarouselElementWrapper: React.FC<CarouselElementWrapperProps> = ({
	children,
	onClick,
	isCurrent,
}) => (
	<div
		aria-hidden
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
	React.Children.forEach(children, (child, childIndex) => {
		if (!React.isValidElement(child)) {
			return;
		}
		// eslint-disable-next-line no-console -- devug
		console.log({ currentOverallIndex, childIndex });
		const key = child.key || `${childIndex}-${childCount}`;
		before.push(
			<CarouselElementWrapper
				key={`before-${key}`}
				isCurrent={currentOverallIndex === childIndex}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{React.cloneElement(child)}
			</CarouselElementWrapper>,
		);
		real.push(
			<CarouselElementWrapper
				key={key}
				isCurrent={currentOverallIndex === childIndex + childCount}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{child}
			</CarouselElementWrapper>,
		);
		after.push(
			<CarouselElementWrapper
				key={`after-${key}`}
				isCurrent={currentOverallIndex === childIndex + childCount * 2}
				onClick={(): void => {
					onClickIndex(childIndex);
				}}
			>
				{React.cloneElement(child)}
			</CarouselElementWrapper>,
		);
	});

	// eslint-disable-next-line react/jsx-no-useless-fragment -- typescript?
	return <>{[...before, ...real, ...after]}</>;
};
