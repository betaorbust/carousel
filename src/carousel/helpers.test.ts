import { getLayoutStart } from './helpers';

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
