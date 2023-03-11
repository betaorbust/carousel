/* @jsxImportSource @emotion/react */
import React, { useContext, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useCallback, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useWindowSize } from 'usehooks-ts';
import { SwipeElement } from './SwipeElement';
import { usePrevious } from './hooks';

const SWIPE_SPEED_S = 0.2;

const slides = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const virtualIndex = 4;
const index = 0;
/* when we detect a change
 1. turn on transition
 2. do the shift
 3. wait for complete
 4. Turn off transition
 5. Rearrange the virtual list, update virtual index
    to inside expected range
 */

type SwipeContainerProps = {
	onChange: (index: number) => void;
	currentIndex: number;
	children: React.ReactNode;
};

const wrapperStyles = css`
	position: relative;
	border: solid 5px green;
	min-height: 200px;
	overflow: hidden;
`;

const containerStyles = css`
	display: flex;
	border: solid 1px red;
	position: absolute;
	left: 0px;
	height: 100%;
`;

// Given a set of equally sized children,
// position the target index in the middle of
// wrapper by returning an offset for the
// container element.
function positionCurrentIndex(
	targetIndex: number,
	containerRef: React.RefObject<HTMLDivElement>,
	wrapperRef: React.RefObject<HTMLDivElement>,
): number {
	if (!containerRef.current || !wrapperRef.current) {
		return 0;
	}
	const wrapperDims = wrapperRef.current.getBoundingClientRect();
	const containerDims = containerRef.current.getBoundingClientRect();
	const target = containerRef.current.children[targetIndex];
	const targetDims = target.getBoundingClientRect();
	const naturalPosition = (targetIndex + 0.5) * targetDims.width;
	const offset = wrapperDims.width / 2 - naturalPosition;
	return offset;
}

export const SwipeContainer: React.FC<SwipeContainerProps> =
	function SwipeContainer({ onChange, children, currentIndex }) {
		const outsideRef = useRef<HTMLDivElement | null>(null);
		const containerRef = useRef<HTMLDivElement | null>(null);
		const childCount = React.Children.count(children);
		// Tracks how far we have to go.
		const [desiredOffset, setDesiredOffset] = useState(0);
		const [transitionPhase, setTransitionPhase] = useState<
			'rest' | 'moving' | 'stopped'
		>('rest');
		// This is in the virtualized list, so we start out childIndex offset
		// because we have a copy of all elements in front of us
		const [internalIndex, setInternalIndex] = useState(
			currentIndex + childCount,
		);
		const [, setInitialMount] = useState(false);

		const previousIndex = usePrevious(currentIndex) || currentIndex;

		useEffect(() => {
			// If we're wrapping around from end to start
			if (currentIndex - previousIndex < -1) {
				// Use the first one of the virutual list
				setDesiredOffset((d) => d + 1);
			}
			// If we're wrapping from start to end
			else if (currentIndex - previousIndex > 1) {
				setDesiredOffset((d) => d - 1);
			}
			// Otherwise just note that we want to shift over one
			else {
				setDesiredOffset((d) => d + (currentIndex - previousIndex));
			}
		}, [currentIndex, previousIndex]);

		// Handle if we have outstanding desiredOffsets
		useEffect(() => {
			if (desiredOffset === 0 || transitionPhase !== 'rest') {
				return;
			}
			// We're going to move!
			setTransitionPhase('moving');
			if (desiredOffset > 0) {
				setInternalIndex((vi) => vi + 1);
				setDesiredOffset((d) => d - 1);
			} else {
				setInternalIndex((vi) => vi - 1);
				setDesiredOffset((d) => d + 1);
			}
			// Clean up after we're done with the transition
			window.setTimeout(() => {
				setTransitionPhase('stopped');
			}, SWIPE_SPEED_S * 1000);
		}, [desiredOffset, transitionPhase]);

		useEffect(() => {
			if (transitionPhase === 'stopped') {
				// Update virtual index to match centered element
				if (virtualIndex < childCount) {
					setInternalIndex((v) => v + childCount);
				} else if (virtualIndex > 2 * childCount) {
					setInternalIndex((v) => v - childCount);
				}
				setTransitionPhase('rest');
			}
		}, [transitionPhase, childCount]);
		const transition =
			transitionPhase === 'rest'
				? 'none'
				: `transform ${SWIPE_SPEED_S}s ease-out`;

		// Re-render on window sizing changes.
		useWindowSize();

		const moveIndexWithWrap = useCallback(
			(totalChildren: number, incrementBy: number) => {
				onChange(
					(currentIndex + totalChildren + incrementBy) %
						totalChildren,
				);
			},
			[currentIndex, onChange],
		);

		// Things to do when a user swipes
		const swipeableHandlers = useSwipeable({
			onSwipedLeft: () => {
				console.log('swiped left!');
				moveIndexWithWrap(childCount, 1);
			},
			onSwipedRight: () => {
				console.log('swiped right!');
				moveIndexWithWrap(childCount, -1);
			},
			swipeDuration: 500,
			touchEventOptions: { passive: false },
			preventScrollOnSwipe: true,
			trackMouse: true,
		});

		// The swiper mechanism uses its own ref, so we're
		// using a callback ref to get ahold of it and
		// asign that ref to our own outsideRef so we can
		// apply styles etc. to it.
		const refPassthrough = useCallback(
			(el: HTMLDivElement) => {
				console.log('refpassthrough was different');
				// call useSwipeables ref prop with el
				swipeableHandlers.ref(el);
				// set the el to a ref you can access yourself
				outsideRef.current = el;
			},
			[swipeableHandlers],
		);

		// When the user clicks directly on one of the children
		// we want to switch to that directly
		const handleChildClick = useCallback(
			(nextIndex: number) => {
				console.log('clicked!', nextIndex);
				onChange(nextIndex);
			},
			[onChange],
		);

		const wrappedChildren = useMemo(() => {
			const before: Array<React.ReactElement> = [];
			const content: Array<React.ReactElement> = [];
			const after: Array<React.ReactNode> = [];
			React.Children.forEach(children, (child, childIndex) => {
				if (!React.isValidElement(child)) {
					return;
				}
				before.push(
					<SwipeElement
						key={'virtual-before-' + (childIndex - childCount)}
						onClick={(): void => {
							handleChildClick(childIndex);
						}}
					>
						{React.cloneElement(child)}
					</SwipeElement>,
				);
				content.push(
					<SwipeElement
						key={childIndex}
						onClick={(): void => {
							handleChildClick(childIndex);
						}}
					>
						{React.cloneElement(child)}
					</SwipeElement>,
				);
				after.push(
					<SwipeElement
						key={'virtual-after-' + childIndex + childCount}
						onClick={(): void => {
							handleChildClick(childIndex);
						}}
					>
						{React.cloneElement(child)}
					</SwipeElement>,
				);
			});
			return [...before, ...content, ...after];
		}, [children, childCount, handleChildClick]);

		const transform = `translateX(${positionCurrentIndex(
			internalIndex,
			containerRef,
			outsideRef,
		)}px)`;

		// Because this depends on measuring the actual layout of
		// the
		useEffect(() => {
			// This won't match the server, so to
			// suppress the warnings about not matching
			// on hydration, we're updating it in a setTimeout
			window.setTimeout(() => {
				setInitialMount(true);
			}, 1);
		}, []);

		console.log({});

		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div
				{...swipeableHandlers}
				ref={refPassthrough}
				css={wrapperStyles}
			>
				<div
					ref={containerRef}
					css={containerStyles}
					style={{ transition, transform }}
				>
					{wrappedChildren}
				</div>
			</div>
		);
	};
