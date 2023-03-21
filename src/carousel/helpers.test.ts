import { getLayoutStart, getRealIndex } from './helpers';

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
