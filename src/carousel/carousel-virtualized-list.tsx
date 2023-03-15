/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { CarouselItemProps } from './carousel-item';

type CarouselElementWrapperProps = {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLDivElement>;
};

const elementStyle = css`
	align-items: stretch;
	flex: 1 1 auto;
`;

const CarouselElementWrapper: React.FC<CarouselElementWrapperProps> = ({
	children,
	onClick,
}) => (
	<div aria-hidden onClick={onClick} css={elementStyle}>
		{children}
	</div>
);

type CarouselVirtualizedListProps = {
	children: React.ReactElement<CarouselItemProps>[];
	onClickIndex: (index: number) => void;
};

export const CarouselVirtualizedList: React.FC<
	CarouselVirtualizedListProps
> = ({ children, onClickIndex }) => {
	const before: Array<React.ReactElement> = [];
	const real: Array<React.ReactElement> = [];
	const after: Array<React.ReactNode> = [];
	const childCount = React.Children.count(children);
	React.Children.forEach(children, (child, childIndex) => {
		if (!React.isValidElement(child)) {
			return;
		}
		const key = child.key || `${childIndex}-${childCount}`;
		before.push(
			<CarouselElementWrapper
				key={`before-${key}`}
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
