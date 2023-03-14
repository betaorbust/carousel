/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

type CarouselElementProps = {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLDivElement>;
};

const elementStyle = css`
	align-items: stretch;
	flex: 1 1 auto;
`;

export const CarouselElement: React.FC<CarouselElementProps> =
	function CarouselElement({ children, onClick }) {
		return (
			<div aria-hidden onClick={onClick} css={elementStyle}>
				{children}
			</div>
		);
	};
