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
	useMemo,
	useState,
	useCallback,
	useRef,
	useEffect,
} from 'react';
import { css } from '@emotion/react';
import { useSwipeable } from 'react-swipeable';
import { useWindowSize } from 'usehooks-ts';
import { CarouselVirtualizedList } from './carousel-virtualized-list';
import { CarouselItemProps } from './carousel-item';
import { usePrevious, findNearest, positionCurrentIndex } from './helpers';

const SWIPE_SPEED_S = 1;

type CarouselProps = {
	onClickIndex: (index: number) => void;
	currentIndex: number;
	children: React.ReactElement<CarouselItemProps>[];
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
	children,
	currentIndex,
}) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const shifterRef = useRef<HTMLDivElement | null>(null);
	const childCount = React.Children.count(children);
	// Tracks how far we have to go.
	const [desiredOffset, setDesiredOffset] = useState(0);
	const [transitionPhase, setTransitionPhase] = useState<
		'rest' | 'start' | 'move' | 'reconcile'
	>('rest');
	// This is in the virtualized list, so we start out childIndex offset
	// because we have a copy of all elements in front of us
	const [internalIndex, setInternalIndex] = useState(
		currentIndex + childCount,
	);
	const unsafePreviousIndex = usePrevious(currentIndex);
	const previousIndex = unsafePreviousIndex ?? currentIndex;

	// Re-render on window sizing changes.
	useWindowSize();

	// Calculate and set updated desiredOffset, which will be
	// shifted towards 0 as animations complete.
	useEffect(() => {
		setDesiredOffset(
			(d) => d + findNearest(currentIndex, previousIndex, childCount),
		);
	}, [currentIndex, previousIndex, childCount]);

	useEffect(() => {
		if (transitionPhase === 'start') {
			setTransitionPhase('move');
		}
	}, [transitionPhase]);

	// If there are desiredOffsets, move them towards 0 by triggering
	// a single animation shift.
	useEffect(() => {
		if (desiredOffset === 0 || transitionPhase !== 'rest') {
			return;
		}
		// We're going to move!
		setTransitionPhase('start');
		if (desiredOffset > 0) {
			setInternalIndex((vi) => vi + 1);
			setDesiredOffset((d) => d - 1);
		} else {
			setInternalIndex((vi) => vi - 1);
			setDesiredOffset((d) => d + 1);
		}
		// Clean up after we're done with the transition
		window.setTimeout(() => {
			setTransitionPhase('reconcile');
		}, SWIPE_SPEED_S * 1000 + 50); // Adding 50ms to make sure we're done
	}, [desiredOffset, transitionPhase]);

	useEffect(() => {
		if (transitionPhase === 'reconcile') {
			// Update virtual index to match centered element
			// if (internalIndex < childCount) {
			// 	setInternalIndex((v) => v + childCount);
			// } else if (internalIndex >= 2 * childCount) {
			// 	setInternalIndex((v) => v - childCount);
			// }
			setTransitionPhase('rest');
		}
	}, [transitionPhase, childCount, internalIndex]);

	// Things to do when a user swipes
	const swipeableHandlers = useSwipeable({
		onSwipedLeft: () => {
			// Wrap around if needed
			onChange((currentIndex + childCount + 1) % childCount);
		},
		onSwipedRight: () => {
			// Wrap around if needed
			onChange((currentIndex + childCount - 1) % childCount);
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

	// Build out a virtual list of children where we have a virtual set of
	// children before and after the actual children. This allows us to
	// virtualize the infinite scroll.
	const wrappedChildren = useMemo(
		() => (
			<CarouselVirtualizedList
				onClickIndex={onChange}
				currentOverallIndex={internalIndex}
			>
				{children}
			</CarouselVirtualizedList>
		),
		[children, onChange, internalIndex],
	);

	const transform = `translateX(${positionCurrentIndex(
		internalIndex,
		shifterRef,
		wrapperRef,
	)}px)`;

	const transition =
		transitionPhase === 'rest'
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
				style={{
					transition,
					transform,
				}}
			>
				{wrappedChildren}
			</div>
			<p>Phase: {transitionPhase}</p>
		</div>
	);
};
