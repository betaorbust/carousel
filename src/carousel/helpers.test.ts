import { getLayoutStart, getRealIndexFromVirtual } from './helpers';

// describe('getLayoutStart', () => {
// 	test.each([
// 		[0, 3, 3],
// 		[1, 3, 3],
// 		[2, 3, 3],
// 		[3, 3, 3],
// 		[4, 3, 3],
// 		[9, 3, 3],
// 	])(
// 		`virtualIndex: %d, totalRealChildren: %d should be %d`,
// 		(virtualIndex, totalRealChildren, expected) => {
// 			expect(getLayoutStart(virtualIndex, totalRealChildren)).toBe(
// 				expected,
// 			);
// 		},
// 	);
// });

describe('getRealIndexFromVirtual', () => {
	test.each([
		[0, 3, 3],
		[1, 3, 4],
		[2, 3, 5],
		[3, 3, 3],
		[9, 3, 3],
		[-8, 3, 4],
		[-7, 3, 5],
		[-1, 3, 5],
	])(
		'virtualIndex: %d, totalRealChildren: %d should be %d',
		(virtualIndex, totalRealChildren, expected) => {
			console.log({ virtualIndex, totalRealChildren, expected });
			console.log(
				getRealIndexFromVirtual(virtualIndex, totalRealChildren),
			);
			expect(
				getRealIndexFromVirtual(virtualIndex, totalRealChildren),
			).toBe(expected);
		},
	);
});
