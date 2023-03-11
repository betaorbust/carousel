import React from 'react';

type CarouselControlsTypes = {
	indexLabels: string[];
	onChange: (index: number) => void;
	currentIndex: number;
};
export const CarouselControls: React.FC<CarouselControlsTypes> =
	function CarouselControls({ indexLabels, onChange, currentIndex }) {
		return (
			<div>
				<button
					type="button"
					onClick={(): void =>
						onChange(
							currentIndex <= 0
								? indexLabels.length
								: currentIndex - 1,
						)
					}
				>
					◀
				</button>
				{indexLabels.map((label, index) => (
					<button
						type="button"
						title={label}
						key={label}
						onClick={(): void => onChange(index)}
					>
						{index === currentIndex ? '●' : '○'}
					</button>
				))}
				<button
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
