import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value; // assign the value of ref to the argument
	}, [value]); // this code will run when the value of 'value' changes
	return ref.current; // in the end, return the current ref value.
}

// Given a set of equally sized children,
// position the target index in the middle of
// wrapper by returning an offset for the
// container element.
export function positionCurrentIndex(
	targetIndex: number,
	containerRef: React.RefObject<HTMLDivElement>,
	wrapperRef: React.RefObject<HTMLDivElement>,
): number {
	if (!containerRef.current || !wrapperRef.current) {
		return 0;
	}
	const wrapperDims = wrapperRef.current.getBoundingClientRect();
	const target = containerRef.current.children[targetIndex];
	if (!target) {
		return 0;
	}
	const targetDims = target.getBoundingClientRect();
	const naturalPosition = (targetIndex + 0.5) * targetDims.width;
	const offset = wrapperDims.width / 2 - naturalPosition;
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
