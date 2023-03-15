/* @jsxImportSource @emotion/react */
import React from 'react';

export type CarouselItemProps = {
	children: React.ReactNode;
	key: string;
};

export const CarouselItem: React.FC<CarouselItemProps> = ({
	children,
	key,
}) => (
	<div aria-hidden key={key}>
		{children}
	</div>
);
