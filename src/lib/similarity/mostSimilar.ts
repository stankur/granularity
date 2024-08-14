import type { KeyedLevelSummary } from '$lib/data/utils';
import cosineSimilarity from 'compute-cosine-similarity';

export function mostSimilar(snippetEmbedding: number[], sources: KeyedLevelSummary[]) {
	const similarities = sources
		.map((source) => {
			if (source.embedding) {
				return cosineSimilarity(snippetEmbedding, source.embedding);
			}
			return null;
		})
		.map((similarity) => similarity ?? 0);

	const mostSimilarIndex = similarities.indexOf(Math.max(...similarities));
	const mostSimilarSource = sources[mostSimilarIndex];

	return mostSimilarSource.key;
}
