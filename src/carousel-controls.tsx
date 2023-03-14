/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

type CarouselControlsTypes = {
	indexLabels: string[];
	onChange: (index: number) => void;
	currentIndex: number;
};

const controlsStyles = css`
	background: none;
	border: none;
	font-size: 1.4rem;
`;

export const CarouselControls: React.FC<CarouselControlsTypes> =
	function CarouselControls({ indexLabels, onChange, currentIndex }) {
		return (
			<div>
				<button
					css={controlsStyles}
					type="button"
					onClick={(): void =>
						onChange(
							currentIndex <= 0
								? indexLabels.length - 1
								: currentIndex - 1,
						)
					}
				>
					◀
				</button>
				{indexLabels.map((label, index) => (
					<button
						css={controlsStyles}
						type="button"
						title={label}
						key={label}
						onClick={(): void => onChange(index)}
					>
						{index === currentIndex ? '●' : '○'}
					</button>
				))}
				<button
					css={controlsStyles}
					type="button"
					onClick={(): void =>
						onChange(
							currentIndex >= indexLabels.length - 1
								? 0
								: currentIndex + 1,
						)
					}
				>
					▶
				</button>
			</div>
		);
	};
