/* @jsxImportSource @emotion/react */
import React, { useContext, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useCallback, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { SwipeElement } from './SwipeElement';
import { useWindowSize } from 'usehooks-ts';
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
) {
	if (!containerRef.current || !wrapperRef.current) {
		return 0;
	}
	const wrapperDims = wrapperRef.current.getBoundingClientRect();
	const containerDims = containerRef.current.getBoundingClientRect();
	const target = containerRef.current.children[targetIndex];
	const targetDims = target.getBoundingClientRect();
	const naturalPosition = (targetIndex + 0.5) * targetDims.width;
	const offset = wrapperDims.width / 2 - naturalPosition;
	console.log({
		wrapperDims,
		containerDims,
		targetDims,
		naturalPosition,
		offset,
	});
	return offset;
}

export const SwipeContainer: React.FC<SwipeContainerProps> = ({
	onChange,
	children,
	currentIndex,
}) => {
	const outsideRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const childCount = React.Children.count(children);
	const [initialMount, setInitialMount] = useState(false);
	const [isMoving, setIsMoving] = useState(true);
	const [virtualIndex, setVirtualIndex] = useState(currentIndex + childCount);
	// Re-render on window sizing changes.
	useWindowSize();

	const previousIndex = usePrevious(currentIndex);

	useEffect(() => {
		if (previousIndex !== currentIndex) {
			setIsMoving(true);
			window.setTimeout(() => {
				setIsMoving(false);
			}, SWIPE_SPEED_S);
		}
	}, [currentIndex, previousIndex]);

	const moveToIndex = useCallback(
		(virtualIndex: number, smoothTransition: boolean) => {},
		[],
	);
	const onMoveStart = useCallback(() => {
		window.setTimeout(() => {
			setIsMoving(false);
		}, SWIPE_SPEED_S);
	}, []);

	const moveIndex = useCallback(
		(childCount: number, incrementBy: number) => {
			console.log({ childCount, incrementBy });
			onChange((currentIndex + childCount + incrementBy) % childCount);
		},
		[currentIndex, onChange],
	);

	// Things to do when a user swipes
	const swipeableHandlers = useSwipeable({
		onSwipedLeft: () => {
			console.log('swiped left!');
			moveIndex(childCount, 1);
		},
		onSwipedRight: () => {
			console.log('swiped right!');
			moveIndex(childCount, -1);
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
		(index: number) => {
			console.log('clicked!', index);
			onChange(index % childCount);
		},
		[onChange],
	);

	// const makeWrapped = useCallback((index: number, element: React.ReactNode) => {
	// 	return 	<SwipeElement onClick={() => handleChildClick(index)}>
	// 	{React.cloneElement(element)}
	// </SwipeElement>
	// }, [])

	const wrappedChildren = useMemo(() => {
		const before: Array<React.ReactElement> = [];
		const content: Array<React.ReactElement> = [];
		const after: Array<React.ReactNode> = [];
		React.Children.forEach(children, (child, index) => {
			if (!React.isValidElement(child)) {
				return;
			}
			before.push(
				<SwipeElement
					key={index - childCount}
					onClick={() => {
						handleChildClick(index - childCount);
					}}>
					{React.cloneElement(child)}
				</SwipeElement>,
			);
			content.push(
				<SwipeElement
					key={index}
					onClick={() => {
						handleChildClick(index);
					}}>
					{React.cloneElement(child)}
				</SwipeElement>,
			);
			after.push(
				<SwipeElement
					key={index + childCount}
					onClick={() => {
						handleChildClick(index);
					}}>
					{React.cloneElement(child)}
				</SwipeElement>,
			);
		});
		return [...before, ...content, ...after];
	}, [[children, handleChildClick]]);

	const transition =
		initialMount && isMoving
			? `transform ${SWIPE_SPEED_S}s ease-out`
			: 'none';
	const transform = `translateX(${positionCurrentIndex(
		currentIndex + childCount,
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

	return (
		<div {...swipeableHandlers} ref={refPassthrough} css={wrapperStyles}>
			<div
				ref={containerRef}
				css={containerStyles}
				style={{ transition, transform }}>
				{wrappedChildren}
			</div>
		</div>
	);
};
