/* @jsxImportSource @emotion/react */
import React from 'react';

export type CarouselItemProps = {
	children: React.ReactNode;
	itemKey: string;
};

export const CarouselItem: React.FC<CarouselItemProps> = ({
	children,
	itemKey,
}) => (
	<div aria-hidden key={itemKey}>
		{children}
	</div>
);
