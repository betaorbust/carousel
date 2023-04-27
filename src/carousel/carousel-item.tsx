/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useContext, useMemo } from 'react';
import { CarouselWidthContext } from './carousel-width-context';

export type CarouselItemProps = {
	children: React.ReactNode;
	/**
	 * A unique key for the the item. This should include the virtual index
	 * provided by the enclosing `renderItemAtIndex` function used by the
	 * `<Carousel/>` component.
	 */
	itemKey: string;
};

const carouselItemStyle = css({
	display: 'inline-flex',
});

/**
 * This component is the wrapper for any item in the carousel. It will be placed
 * with the width value that was provided to the <Carousel /> component.
 */
export const CarouselItem: React.FC<CarouselItemProps> = ({
	children,
	itemKey,
}) => {
	const itemWidth = useContext(CarouselWidthContext);
	const itemStyle = useMemo(() => {
		return { width: `${itemWidth}px` };
	}, [itemWidth]);
	return (
		<div css={carouselItemStyle} style={itemStyle} key={itemKey}>
			{children}
		</div>
	);
};
