/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
type SwipeElementProps = {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLDivElement>;
};

const elementStyle = css`
	height: 100%;
	flex: 1 1 auto;
	border: solid 1px rebeccapurple;
`;

export const SwipeElement: React.FC<SwipeElementProps> = ({
	children,
	onClick,
}) => {
	return (
		<div aria-hidden onClick={onClick} css={elementStyle}>
			{children}
		</div>
	);
};
