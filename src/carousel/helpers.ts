// Get the layout start of the real set of elements (not the phantom ones)
export function getLayoutStart(
	virtualIndex: number,
	totalRealChildren: number,
): number {
	// Get the starting point of the current set of elements
	return Math.floor(virtualIndex / totalRealChildren) * totalRealChildren;
}

/**
 * Return the index of the real element array that any
 * given virtual index maps to
 */
export function getRealIndex(virtualIndex: number, totalItems: number): number {
	return virtualIndex < 0
		? (totalItems - (-virtualIndex % totalItems)) % totalItems
		: virtualIndex % totalItems;
}

export function positionCurrentIndex(
	virtualIndex: number,
	containerRef: React.RefObject<HTMLDivElement>,
	wrapperRef: React.RefObject<HTMLDivElement>,
): number {
	if (!containerRef.current || !wrapperRef.current) {
		return 0;
	}
	const target = containerRef.current.querySelector(
		`[data-virtual-index="${virtualIndex}"]`,
	);
	if (!target) {
		return 0;
	}
	const targetDims = target.getBoundingClientRect();
	const containerDims = containerRef.current.getBoundingClientRect();
	const wrapperDims = wrapperRef.current.getBoundingClientRect();

	const wrapperMidpoint = wrapperDims.width / 2;
	const targetMidpoint = targetDims.width / 2;
	const targetOffset = targetDims.left - containerDims.left + targetMidpoint;
	const offset = wrapperMidpoint - targetOffset;
	return offset;
}
/**
 * Given an incoming index, the previous index, and the total number of children,
 * return the offset that, including wrapping, gets us to the incoming index.
 */
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
		return Math.abs(difference) <= Math.abs(wrappedDifference)
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

/**
 * Given a virtual index and an incoming next index (from the real space),
 * find the nearest virtual index that maps to the real index.
 */
export function getNearestVirtualIndexMappingToReal(
	virtualIndex: number,
	realIndex: number,
	totalItems: number,
): number {
	const currentVirtualInReal = getRealIndex(virtualIndex, totalItems);
	const difference = findNearest(realIndex, currentVirtualInReal, totalItems);
	return virtualIndex + difference;
}
