import type { LeveledSummary } from '$lib/types/LeveledSummary';

export interface KeyedLevelSummary extends LeveledSummary {
	key: string;
	ref?: HTMLElement;
	source: KeyedLevelSummary[];
}

export function key(arr: LeveledSummary[], pastKey: string): KeyedLevelSummary[] {
	return arr.map(({ content, source, embedding }, i) => {
		const newKey = `${pastKey}.${i}`;
		return {
			content,
			embedding,
			key: newKey,
			source: key(source, newKey)
		};
	});
}

export function getDepth(arr: KeyedLevelSummary[], depth: 1 | 2 | 3): KeyedLevelSummary[] {
	if (depth === 1) {
		return arr;
	}

	return arr.flatMap(({ source }) => getDepth(source, (depth - 1) as 1 | 2));
}

export function getDualDepth(
	arr: KeyedLevelSummary[],
	depth: (1 | 2 | 3)[],
	currentDepth: 1 | 2 | 3
): KeyedLevelSummary[] {
	if (depth.includes(currentDepth)) {
		return arr.map(({ content, source, embedding, key }) => ({
			content,
			source: getDualDepth(source, depth, (currentDepth + 1) as 1 | 2 | 3),
			embedding,
			key
		}));
	}

	return arr.flatMap(({ source }) => getDualDepth(source, depth, (currentDepth + 1) as 1 | 2 | 3));
}
