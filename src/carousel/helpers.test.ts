import { describe, expect, test } from '@jest/globals';

import {
	findNearest,
	getLayoutStart,
	getNearestVirtualIndexMappingToReal,
	getRealIndex,
} from './helpers';

describe('getLayoutStart', () => {
	test.each([
		[-4, 3, -6],
		[-3, 3, -3],
		[-2, 3, -3],
		[-1, 3, -3],
		[0, 3, 0],
		[1, 3, 0],
		[2, 3, 0],
		[3, 3, 3],
		[4, 3, 3],
		[9, 3, 9],
	])(
		`virtualIndex: %d, totalRealChildren: %d should be %d`,
		(virtualIndex, totalRealChildren, expected) => {
			expect(getLayoutStart(virtualIndex, totalRealChildren)).toBe(
				expected,
			);
		},
	);
});

describe('getRealIndex', () => {
	test.each([
		[0, 4, 0],
		[1, 4, 1],
		[2, 4, 2],
		[3, 4, 3],
		[4, 4, 0],
		[5, 4, 1],
		[-1, 4, 3],
		[-2, 4, 2],
		[-3, 4, 1],
		[-4, 4, 0],
		[-5, 4, 3],
	])(
		`virtualIndex: %d, totalItems: %d should be %d`,
		(virtualIndex, totalItems, expected) => {
			expect(getRealIndex(virtualIndex, totalItems)).toBe(expected);
		},
	);
});

describe('getNearestVirtualIndexMappingToReal', () => {
	test.each([
		[-5, 0, 4, -4],
		[-4, 0, 4, -4],
		[-3, 0, 4, -4],
		[-2, 0, 4, 0],
		[-1, 0, 4, 0],
		[0, 0, 4, 0],
		[1, 0, 4, 0],
		[2, 0, 4, 4],
		[3, 0, 4, 4],
		[4, 0, 4, 4],
	])(
		`virtualIndex: %d, incomingRealIndex %d, totalItems: %d, should be %d`,
		(virtualIndex, incomingRealIndex, totalItems, expected) => {
			expect(
				getNearestVirtualIndexMappingToReal(
					virtualIndex,
					incomingRealIndex,
					totalItems,
				),
			).toBe(expected);
		},
	);
});

describe('findNearest', () => {
	test.each([
		[0, 0, 4, 0],
		[1, 0, 4, 1],
		[2, 0, 4, 2],
		[-3, -2, 4, -1],
		[-2, -3, 4, 1],
		[-4, -4, 4, 0],
		[-4, -5, 4, 1],
	])(
		`next: %d, previous: %d, total: %d, should be %d`,
		(next, previous, total, expected) => {
			expect(findNearest(next, previous, total)).toBe(expected);
		},
	);
});
