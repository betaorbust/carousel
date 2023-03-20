import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value; // assign the value of ref to the argument
	}, [value]); // this code will run when the value of 'value' changes
	return ref.current; // in the end, return the current ref value.
}

// Get the layout start of the real set of elements (not the phantom ones)
export function getLayoutStart(
	virtualIndex: number,
	totalRealChildren: number,
): number {
	return 3;
	// Get the starting point of the current set of elements
	if (virtualIndex < 0) {
		return (
			virtualIndex -
			(virtualIndex % totalRealChildren) -
			// Shift over by one set of elements if we're in negative territory
			totalRealChildren
		);
	}

	console.log(
		`returning ${totalRealChildren + (virtualIndex % totalRealChildren)}`,
	);
	return totalRealChildren + (virtualIndex % totalRealChildren);
}

// Get the laid out DOM index for a given virtual index
export function getRealIndexFromVirtual(
	virtualIndex: number,
	totalRealChildren: number,
): number {
	const realStartIndex = getLayoutStart(virtualIndex, totalRealChildren);
	if (realStartIndex < 0) {
		// One set of phantom elements at the start and then the real elements
		// after that, but flipped because we're in negative territory.
		return (
			totalRealChildren +
			totalRealChildren -
			(-virtualIndex % totalRealChildren)
		);
	}
	// console.log({ totalRealChildren, realStartIndex, virtualIndex });
	return realStartIndex + (virtualIndex % totalRealChildren);
}

// Given a set of equally sized children,
// position the target index in the middle of
// wrapper by returning an offset for the
// container element.
export function positionCurrentIndex(
	virtualIndex: number,
	totalRealChildren: number,
	containerRef: React.RefObject<HTMLDivElement>,
	wrapperRef: React.RefObject<HTMLDivElement>,
): number {
	if (!containerRef.current || !wrapperRef.current) {
		return 0;
	}
	const wrapperDims = wrapperRef.current.getBoundingClientRect();
	const laidOutIndex = getRealIndexFromVirtual(
		virtualIndex,
		totalRealChildren,
	);
	console.log({ laidOutIndex, virtualIndex });
	const target = containerRef.current.children[laidOutIndex];
	if (!target) {
		return 0;
	}
	const targetDims = target.getBoundingClientRect();
	// 0.5 gives us the center
	const naturalPosition = (laidOutIndex + 0.5) * targetDims.width;
	const offset = wrapperDims.width / 2 - naturalPosition;
	console.log({
		naturalPosition,
		offset,
		wrapperWidth: wrapperDims.width,
		targetWidth: targetDims.width,
	});
	return offset;
}

// Given an incoming index, the previous index, and the total number of children,
// return the offset that, including wrapping, gets us to the incoming index.
export function findNearest(
	next: number,
	previous: number,
	total: number,
): number {
	const difference = next - previous;

	// If we have a positive difference, we're moving forward.
	if (difference >= 0) {
		// So try going backwards to see if that's closer
		const wrappedDifference = -total + difference;
		return Math.abs(difference) < Math.abs(wrappedDifference)
			? difference
			: wrappedDifference;
	}
	// Otherwise we're going backwards, so try going forwards
	// to see if that's closer
	const wrappedDifference = total + difference;
	return Math.abs(difference) < Math.abs(wrappedDifference)
		? difference
		: wrappedDifference;
}
