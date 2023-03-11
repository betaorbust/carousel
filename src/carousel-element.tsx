/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

type CarouselElementProps = {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLDivElement>;
};

const elementStyle = css`
	height: 100%;
	flex: 1 1 auto;
	border: solid 1px rebeccapurple;
`;

export const CarouselElement: React.FC<CarouselElementProps> =
	function CarouselElement({ children, onClick }) {
		return (
			<div aria-hidden onClick={onClick} css={elementStyle}>
				{children}
			</div>
		);
	};
