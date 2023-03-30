/* @jsxImportSource @emotion/react */
/**
 * @fileoverview CarouselContainer
 * This file creates a swipeable, clickable, carousel that does not itself
 * hold the state of the current index. As the parent component changes the current
 * index, the container will animate to that index. It does this by creating a
 * virtualized list of elements based on render function passed in. With a fully virtualized
 * list, we can make sure there are always enough elements to fill the screen.
 *
 * The component itself tries to be as dumb as possible. It does have an internal index
 * that is used to track the current index of the virtualized list. Any time the parent
 * component changes the current index, the container will animate to the nearest virtual
 * index that maps to the real index.
 *
 * On internal swipes and drags, the container will animate and update its internal state
 * before calling the parent component's onChangeIndex function. So we're only committing
 * the change after the action is complete.
 */
import React, {
	useState,
	useCallback,
	useRef,
	useEffect,
	useLayoutEffect,
} from 'react';
import { css } from '@emotion/react';
import { useSwipeable } from 'react-swipeable';
import { useWindowSize } from 'usehooks-ts';
import { CarouselVirtualizedList } from './carousel-virtualized-list';
import {
	positionCurrentIndex,
	getRealIndex,
	getNearestVirtualIndexMappingToReal,
} from './helpers';

type CarouselProps = {
	onClickIndex: (index: number) => void;
	currentIndex: number;
	itemCount: number;
	itemWidth: number;
	virtualListSize: number;
	animationDurationMs: number;
	swipeMaxDurationMs: number;
	swipeMinDistancePx: number;
	renderItemAtIndex: React.ComponentProps<
		typeof CarouselVirtualizedList
	>['renderItemAtIndex'];
	preventScrolling: boolean;
};

const wrapperStyles = css`
	position: relative;
	overflow: hidden;
`;

const shifterStyles = css`
	display: flex;
`;

const preventDefault = (e: Event): void => {
	e.preventDefault();
};

export const Carousel: React.FC<CarouselProps> = ({
	onClickIndex: onChange,
	currentIndex,
	renderItemAtIndex,
	itemCount,
	itemWidth,
	animationDurationMs,
	swipeMaxDurationMs,
	swipeMinDistancePx,
	virtualListSize,
	preventScrolling,
}) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const shifterRef = useRef<HTMLDivElement | null>(null);
	const [transitionPhase, setTransitionPhase] = useState<
		'rest' | 'move' | 'settle' | 'reconcile'
	>('rest');
	// This is in the virtualized list, so we start out childIndex offset
	// because we have a copy of all elements in front of us
	const [internalIndex, setInternalIndex] = useState(currentIndex);
	const [startIndex, setStartIndex] = useState(
		currentIndex - Math.round(virtualListSize / 2),
	);
	const [endIndex, setEndIndex] = useState(
		currentIndex + Math.round(virtualListSize / 2),
	);
	const [transform, setTransform] = useState('none');
	const [manuallyDragging, setManuallyDragging] = useState(false);
	const interactionRef = useRef({
		startTime: 0,
		touchXLast: 0,
		touchXStart: 0,
		carouselInitialOffset: 0,
	});

	// Re-render on window sizing changes.
	const windowSize = useWindowSize();

	// Set the internal index to be the nearest virtual index
	useEffect(() => {
		setInternalIndex(
			getNearestVirtualIndexMappingToReal(
				internalIndex,
				currentIndex,
				itemCount,
			),
		);
	}, [currentIndex, itemCount, internalIndex]);

	// If we have outstanding motions to do, kick them off
	// and then trigger a reconciliation so we can update
	// the virtual list after things have stopped moving.
	useEffect(() => {
		if (
			transitionPhase !== 'rest' ||
			internalIndex ===
				getNearestVirtualIndexMappingToReal(
					internalIndex,
					currentIndex,
					itemCount,
				)
		) {
			return;
		}
		// We're going to move!
		setTransitionPhase('move');
		// Clean up after we're done with the transition
		window.setTimeout(() => {
			setTransitionPhase('reconcile');
		}, animationDurationMs + 50); // Adding 50ms to make sure we're done
	}, [
		transitionPhase,
		currentIndex,
		internalIndex,
		itemCount,
		animationDurationMs,
	]);

	// During reconciliation, update the virtual list to center the
	// current index, and provide new elements on either side.
	useEffect(() => {
		if (transitionPhase === 'reconcile') {
			const halfOfVirtualList = Math.round((virtualListSize - 1) / 2);
			setStartIndex(() => internalIndex - halfOfVirtualList);
			setEndIndex(() => internalIndex + halfOfVirtualList);
			setTransitionPhase('rest');
		}
	}, [transitionPhase, itemCount, internalIndex, virtualListSize]);

	// Handle dragging internally because of the performance impact
	// that would happen if it rendered the react components on every frame.
	// It tracks manual drags, updating a ref and the raw styles in vanilla JS
	// until the drag is complete.
	const onManualMove:
		| React.MouseEventHandler<HTMLDivElement> &
				React.TouchEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			if (manuallyDragging && shifterRef.current) {
				// This could come from a touch or a mouse event so we have to
				// pull the x coordinate from the right place
				const x =
					'clientX' in event
						? event.clientX
						: event.touches[0].clientX;

				interactionRef.current.touchXLast = x;
				// We do this live on the dom element so we don't have to
				// re-render every single frame
				shifterRef.current.style.transform = `translateX(${
					interactionRef.current.carouselInitialOffset -
					(interactionRef.current.touchXStart -
						interactionRef.current.touchXLast)
				}px)`;
			}
		},
		[manuallyDragging],
	);

	// During a manual drag, if preventScrolling is set, we attach a touchmove
	// event to kill the scroll event.
	useEffect(() => {
		if (manuallyDragging && preventScrolling) {
			document.addEventListener('touchmove', preventDefault, {
				passive: false,
			});
		} else {
			document.removeEventListener('touchmove', preventDefault);
		}
		return () => {
			document.removeEventListener('touchmove', preventDefault);
		};
	}, [manuallyDragging, preventScrolling]);

	// Initially this relied a lot more on useSwipeable, but as the complexity
	// of all our interactions grew, everything ended up having to be moved into
	// the onTouchStartOrOnMouseDown and onTouchEndOrOnMouseUp handlers, so this
	// is a good candidate for a refactor to remove the dependency and just use the
	// native handlers directly.
	const swipeableHandlers = useSwipeable({
		onTouchStartOrOnMouseDown: ({ event }) => {
			setManuallyDragging(true);
			// We start where we are
			interactionRef.current.carouselInitialOffset = positionCurrentIndex(
				internalIndex,
				shifterRef,
				wrapperRef,
			);
			interactionRef.current.startTime = Date.now();
			if ('clientX' in event) {
				interactionRef.current.touchXStart = event.clientX;
				interactionRef.current.touchXLast = event.clientX;
			} else if ('touches' in event && event.touches.length > 0) {
				interactionRef.current.touchXStart = event.touches[0].clientX;
				interactionRef.current.touchXLast = event.touches[0].clientX;
			}
		},
		onTouchEndOrOnMouseUp: () => {
			setManuallyDragging(false);
			const { touchXStart, touchXLast, startTime } =
				interactionRef.current;
			const delta = touchXStart - touchXLast;
			const deltaUnits = Math.round(delta / itemWidth);
			const duration = Date.now() - startTime;

			// Tap: < 10px movement no time limit
			// Swipe: > 10px movement < swipe time
			// Drag: > 10px movement > swipe time
			// If it was a tap, we don't want to update the index at all, as the
			// click handler will do that for us.
			if (Math.abs(delta) < swipeMinDistancePx) {
				console.log('tap detected');
			} else {
				setTransitionPhase('move');
				// It was a drag
				console.log('drag detected');
				// If we dragged only a little bit, but did it quickly
				// we call that a swipe, and add an offset in the direction
				// of the swipe.
				let swipeOffset = 0;
				if (deltaUnits === 0 && duration < swipeMaxDurationMs) {
					console.log('swipe detected');
					swipeOffset = delta > 0 ? 1 : -1;
				}

				const newInternalIndex =
					internalIndex + deltaUnits + swipeOffset;

				setInternalIndex(newInternalIndex);
				onChange(getRealIndex(newInternalIndex, itemCount));
				setTimeout(() => {
					setTransitionPhase('reconcile');
				}, animationDurationMs + 50); // Adding 50ms to make sure we're done
			}
		},
		swipeDuration: 500,
		touchEventOptions: { passive: false },
		preventScrollOnSwipe: true,
		trackMouse: true,
	});

	// useSwipeable uses its own ref, so we're
	// using a callback ref to get ahold of it and
	// assign that ref to our own outsideRef so we can
	// apply styles etc. to it.
	const refPassthrough = useCallback(
		(el: HTMLDivElement) => {
			// call useSwipeables ref prop with el
			swipeableHandlers.ref(el);
			// set the el to a ref you can access yourself
			wrapperRef.current = el;
		},
		[swipeableHandlers],
	);

	// Function that gets called whenever a user clicks an element
	// in the virtual list.
	const onClickIndex = useCallback(
		(index: number) => {
			// Don't bother to re-render if we're already on the index
			if (transitionPhase !== 'rest' || index === currentIndex) {
				return;
			}
			onChange(getRealIndex(index, itemCount));
		},
		[itemCount, onChange, currentIndex, transitionPhase],
	);

	// Calculate the transform to apply to the shifter element
	// unfortunately this has to be done with a useLayoutEffect
	// because we don't know how many elements are in the virtual
	// list until after the first render.
	useLayoutEffect(
		() => {
			setTransform(
				`translateX(${positionCurrentIndex(
					internalIndex,
					shifterRef,
					wrapperRef,
				)}px)`,
			);
		},
		// Update between phases and any time the window size changes
		[internalIndex, transitionPhase, windowSize, itemWidth],
	);

	// We only use the css transition for transform when we're letting
	// the elements settle during the move phase. In reconciliation and
	// rest, we don't want the transition to happen (because we're updating
	// the virtual list, and we don't want to see the shift)
	// During manual dragging, we don't want the transition because we want
	// the elements to track as close to the touch as possible.
	const transition =
		transitionPhase === 'move' && !manuallyDragging
			? `transform ${animationDurationMs / 1000}s ease-out`
			: 'none';
	return (
		<div
			// This entire component is hidden from screen readers and keyboard
			// navigation because the infinite virtual list of buttons is a terrible
			// user experience. Instead, the lower carousel navigation is focusable
			// and aria labels that match the contents of this component's children.
			aria-hidden
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...swipeableHandlers}
			ref={refPassthrough}
			css={wrapperStyles}
		>
			<div
				ref={shifterRef}
				css={shifterStyles}
				onMouseMove={onManualMove}
				onTouchMove={onManualMove}
				style={{
					transition,
					transform,
					// touchAction,
				}}
			>
				<CarouselVirtualizedList
					itemWidth={itemWidth}
					onClickIndex={onClickIndex}
					startIndex={startIndex}
					endIndex={endIndex}
					currentOverallIndex={internalIndex}
					renderItemAtIndex={renderItemAtIndex}
				/>
			</div>
		</div>
	);
};
