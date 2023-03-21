/* @jsxImportSource @emotion/react */
/**
 * @fileoverview CarouselContainer
 * This file creates a swipeable, clickable, carousel that does not itself
 * hold the state of the current index. As the parent component changes the current
 * index, the container will animate to that index. It does this by creating a
 * virtualized list of elements based on the children passed in. There's a
 * full clone of the child elements put before and after the actual child elements
 * so we have a visually continuous list of elements so a user can go forward or backwards
 * without seeing a blank space.
 *
 * When the current index changes, this element will find the desired direction and add
 * that to a desired offset. While the desired offset is not 0, it moves it 1 closer to
 * 0 and triggers a shift animation. This lets us stack up multiple moves and play them
 * one after another until we get to the final targe -- so a user can swipe faster than
 * we animate.
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
	usePrevious,
	findNearest,
	positionCurrentIndex,
	getRealIndex,
} from './helpers';

const SWIPE_SPEED_S = 0.5;
const SWIPE_MAX_DURATION_MS = 500;
const SWIPE_MIN_DISTANCE_PX = 10;

type CarouselProps = {
	onClickIndex: (index: number) => void;
	currentIndex: number;
	itemCount: number;
	itemWidth: number;
	renderItemAtIndex: React.ComponentProps<
		typeof CarouselVirtualizedList
	>['renderItemAtIndex'];
};

const wrapperStyles = css`
	position: relative;
	overflow: hidden;
`;

const shifterStyles = css`
	display: flex;
`;

export const Carousel: React.FC<CarouselProps> = ({
	onClickIndex: onChange,
	currentIndex,
	renderItemAtIndex,
	itemCount,
	itemWidth,
}) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const shifterRef = useRef<HTMLDivElement | null>(null);
	// Tracks how far we have to go.
	const [desiredOffset, setDesiredOffset] = useState(0);
	const [transitionPhase, setTransitionPhase] = useState<
		'rest' | 'move' | 'settle' | 'reconcile'
	>('rest');
	// This is in the virtualized list, so we start out childIndex offset
	// because we have a copy of all elements in front of us
	const [internalIndex, setInternalIndex] = useState(currentIndex);
	const unsafePreviousIndex = usePrevious(currentIndex);
	const previousIndex = unsafePreviousIndex ?? currentIndex;
	const [startIndex, setStartIndex] = useState(currentIndex - itemCount);
	const [endIndex, setEndIndex] = useState(currentIndex + itemCount);
	const [transform, setTransform] = useState('none');
	const [manuallyScrolling, setManuallyScrolling] = useState(false);
	const interactionRef = useRef({
		startTime: 0,
		touchXLast: 0,
		touchXStart: 0,
		carouselInitialOffset: 0,
	});

	console.log('r', {
		currentIndex,
		previousIndex,
		internalIndex,
		desiredOffset,
		transitionPhase,
	});

	// Re-render on window sizing changes.
	const windowSize = useWindowSize();

	// Calculate and set updated desiredOffset, which will be
	// shifted towards 0 as animations complete.
	useEffect(() => {
		setDesiredOffset(
			(d) => d + findNearest(currentIndex, previousIndex, itemCount),
		);
	}, [currentIndex, previousIndex, itemCount]);

	// If there are desiredOffsets, move them towards 0 by triggering
	// a single animation shift.
	useEffect(() => {
		if (desiredOffset === 0 || transitionPhase !== 'rest') {
			return;
		}
		// We're going to move!
		setTransitionPhase('move');
		console.log('at rest moving');
		setInternalIndex((vi) => vi + desiredOffset);
		setDesiredOffset((d) => d - desiredOffset);

		// Clean up after we're done with the transition
		window.setTimeout(() => {
			setTransitionPhase('reconcile');
		}, SWIPE_SPEED_S * 1000 + 50); // Adding 50ms to make sure we're done
	}, [desiredOffset, transitionPhase]);

	useEffect(() => {
		if (transitionPhase === 'reconcile') {
			setStartIndex(() => internalIndex - itemCount);
			setEndIndex(() => internalIndex + itemCount);
			setTransitionPhase('rest');
		}
	}, [transitionPhase, itemCount, internalIndex, setTransitionPhase]);

	const onManualScrollMove: React.MouseEventHandler<HTMLDivElement> =
		useCallback(
			(event) => {
				if (manuallyScrolling && shifterRef.current) {
					interactionRef.current.touchXLast = event.clientX;
					shifterRef.current.style.transform = `translateX(${
						interactionRef.current.carouselInitialOffset -
						(interactionRef.current.touchXStart -
							interactionRef.current.touchXLast)
					}px)`;
				}
			},
			[manuallyScrolling],
		);

	// Things to do when a user swipes
	const swipeableHandlers = useSwipeable({
		onTouchStartOrOnMouseDown: ({ event }) => {
			setManuallyScrolling(true);
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
			/**
			 *  At the end of the motion, decide what we should do:
			 * 	- Is it a true swip? Then swipe.
			 *  - Is it a tap? Then let the click handler handle it.
			 *  - Is it a drag?
			 *      - See how many units we dragged
			 *      - Update the internal index
			 *      - Update the parent index to match IS THIS WHERE THE EXTRA DELTA COMES FROM??
			 */
			setManuallyScrolling(false);
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
			if (Math.abs(delta) < SWIPE_MIN_DISTANCE_PX) {
				console.log('tap detected');
				// but we do need to set a transition phase so we can
				// animate back to the center
				// setTransitionPhase('reconcile');
			} else {
				setTransitionPhase('move');
				// It was a drag
				console.log('drag detected');
				// If we dragged only a little bit, but did it quickly
				// we call that a swipe, and add an offset in the direction
				// of the swipe.
				let swipeOffset = 0;
				if (deltaUnits === 0 && duration < SWIPE_MAX_DURATION_MS) {
					swipeOffset = delta > 0 ? 1 : -1;
				}

				const newInternalIndex =
					internalIndex + deltaUnits + swipeOffset;
				console.log('end!', {
					internalIndex,
					deltaUnits,
					swipeOffset,
					newIndex: newInternalIndex,
					delta,
					duration,
				});
				console.log(
					'going to set the index from inside the drag to',
					newInternalIndex,
					getRealIndex(newInternalIndex, itemCount),
				);
				setInternalIndex(newInternalIndex);
				onChange(getRealIndex(newInternalIndex, itemCount));
				setTimeout(() => {
					setTransitionPhase('reconcile');
				}, SWIPE_SPEED_S * 1000 + 50); // Adding 50ms to make sure we're done
			}
		},
		swipeDuration: 500,
		touchEventOptions: { passive: false },
		preventScrollOnSwipe: true,
		trackMouse: true,
	});

	// The swiper mechanism uses its own ref, so we're
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

	const onClickIndex = useCallback(
		(index: number) => {
			// Don't bother to re-render if we're already on the index
			if (index === currentIndex) {
				return;
			}
			onChange(getRealIndex(index, itemCount));
		},
		[itemCount, onChange, currentIndex],
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
		[internalIndex, transitionPhase, windowSize],
	);

	const transition =
		transitionPhase === 'rest' || manuallyScrolling
			? 'none'
			: `transform ${SWIPE_SPEED_S}s ease-out`;

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
				onMouseMove={onManualScrollMove}
				style={{
					transition,
					transform,
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
			<p>Phase: {transitionPhase}</p>
			<p>internal index: {internalIndex}</p>
		</div>
	);
};
